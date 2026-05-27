# Conexión a ContaPyme por internet
[Ver el video](https://www.youtube.com/watch?v=5gJmq_-sCiM)
[Conexión a ContaPyme por internet]

## Tema principal
Conectar usuarios en diferentes ubicaciones geográficas a ContaPyme a través de internet.

## Resumen general
Este video explica cómo conectar múltiples usuarios de ContaPyme que se encuentran en diferentes ubicaciones a un equipo principal, permitiéndoles trabajar de forma simultánea. Se detallan los requisitos necesarios para establecer una conexión a través de internet, incluyendo la configuración de la IP pública y la apertura del puerto 3050. El video muestra el proceso de verificación del puerto y la conexión desde un equipo adicional al equipo principal.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo de conectar ContaPyme por internet?
#### Respuesta
El objetivo es permitir que varios usuarios ubicados en diferentes lugares puedan acceder a ContaPyme y trabajar simultáneamente, actualizando la información en línea.

### ¿Qué necesito tener en cuenta para saber si necesito una conexión a internet?
#### Respuesta
Si los equipos que van a usar ContaPyme están ubicados en diferentes ciudades o lugares distintos dentro de la misma ciudad, se requiere una conexión a internet para que puedan conectarse al equipo principal.

### ¿Cuáles son los requisitos para establecer una conexión a internet en ContaPyme?
#### Respuesta
Los requisitos son:
1.  Definir cuál será el **equipo principal** y cuáles serán los **equipos adicionales**.
2.  Tener **instalado ContaPyme** principal en el equipo principal y ContaPyme adicional en los equipos adicionales.
3.  Tener una **conexión a internet** estable.
4.  Tener las **licencias registradas y activadas** en el equipo principal.
5.  Solicitar la **apertura del puerto 3050** al proveedor de internet en el equipo principal.
6.  Consultar la **IP pública** del equipo principal.

### ¿Por qué es necesario solicitar la apertura del puerto 3050?
#### Respuesta
ContaPyme utiliza un motor de base de datos llamado Firebird, y Firebird utiliza el puerto 3050 por defecto para la comunicación. Es necesario que este puerto esté abierto en el equipo principal para que los equipos adicionales puedan conectarse.

### ¿Cómo puedo verificar si el puerto 3050 está abierto?
#### Respuesta
Puedes verificar si el puerto 3050 está abierto utilizando una página web como `canyouseeme.org`.
1.  Ingresa a `canyouseeme.org` en tu navegador.
2.  Verás un campo para ingresar el número de puerto. Reemplaza el puerto que aparece por defecto con el **puerto 3050**.
3.  Haz clic en el botón **"Check Port"** (o "Comprobar Puerto").
    *   Si el puerto está cerrado, aparecerá un mensaje de error en rojo.
    *   Si el puerto está abierto, aparecerá un mensaje de confirmación en verde.

### ¿Qué debo hacer si el puerto 3050 está cerrado?
#### Respuesta
Debes contactar a tu proveedor de internet y solicitar la apertura del puerto 3050 para la IP pública de tu equipo principal.

### ¿Cuál es la diferencia entre la IP pública y la IP local?
#### Respuesta
La **IP local** se utiliza para conexiones dentro de una misma red local (por ejemplo, en una oficina o casa). La **IP pública** es la dirección que tu proveedor de internet te asigna y se utiliza para conexiones a través de internet desde diferentes ubicaciones.

### ¿Cómo me conecto a ContaPyme en el equipo principal?
#### Respuesta
La conexión al equipo principal es siempre la misma, sin importar el tipo de conexión:
1.  Abre ContaPyme.
2.  En el campo **"Servidor de datos"**, selecciona **"Servidor Local"**.
3.  Ingresa el **usuario** y la **contraseña**.
4.  Selecciona el **área de trabajo**.
5.  Selecciona la **licencia** correspondiente.
6.  Haz clic en **"Conectar"**.

### ¿Cómo me conecto a ContaPyme desde un equipo adicional a través de internet?
#### Respuesta
1.  Abre ContaPyme en el equipo adicional.
2.  En el campo **"Servidor de datos"**, haz clic en el icono del computador.
3.  Ingresa la **IP pública** del equipo principal.
4.  Haz clic en **"Conectar"**.
5.  Ingresa el **usuario** y la **contraseña**.
6.  Selecciona el **área de trabajo**.
7.  Selecciona la **licencia** correspondiente.
8.  Haz clic en **"Conectar"**.

### ¿El proceso de apertura del puerto 3050 se realiza en todos los equipos?
#### Respuesta
No, el proceso de apertura del puerto 3050 solo se realiza en el **equipo principal**. La IP pública de este equipo es la que se utilizará en todos los equipos adicionales.

---

# Conexión a ContaPyme por red local
[Ver el video](https://www.youtube.com/watch?v=WTZt2Las-VM)
Conexión a ContaPyme por medio de red local

## Tema principal
Conectar múltiples usuarios de ContaPyme en una misma red local para trabajar simultáneamente.

## Resumen general
Este video explica cómo conectar varios ordenadores que se encuentran en la misma ubicación física (red local) a ContaPyme, permitiendo que múltiples usuarios trabajen simultáneamente. Se detalla cómo identificar el equipo principal, instalar ContaPyme en los equipos adicionales, obtener la dirección IP local del equipo principal y cómo usar esa información para conectar los equipos adicionales. También se muestra una alternativa para conectar los equipos usando el nombre del equipo principal en lugar de la dirección IP.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una red local?
#### Respuesta
Una red local es un grupo de ordenadores o dispositivos conectados entre sí dentro de la misma ubicación física, como una casa u oficina, y que están conectados a través de WiFi, un módem o un router.

### ¿Cuáles son los requisitos para establecer una conexión a ContaPyme a través de una red local?
#### Respuesta
Los requisitos son:
1.  Identificar cuál será el equipo principal y cuáles serán los equipos adicionales.
2.  Instalar ContaPyme principal en el equipo principal y ContaPyme adicional en los equipos adicionales.
3.  Registrar y activar las licencias en el equipo principal.
4.  Consultar la IP local del equipo principal.
5.  Ingresar la IP consultada en los equipos adicionales para establecer la conexión.

### ¿Cómo consultar la IP local en el equipo principal?
#### Respuesta
Para consultar la IP local en el equipo principal, sigue estos pasos:
1.  Haz clic en el botón de **Inicio** (el icono de Windows).
2.  Escribe `cmd` para abrir el **Símbolo del sistema**.
3.  En la ventana del Símbolo del sistema, escribe `ipconfig` y presiona **Enter**.
4.  Busca la línea que dice **Dirección IPv4**. La serie de números que aparece después de los puntos es tu IP local.

### ¿Dónde se deben registrar y activar las licencias de ContaPyme?
#### Respuesta
Todas las licencias de ContaPyme deben registrarse y activarse en el equipo principal.

### ¿Cómo me conecto a ContaPyme desde el equipo principal (localmente)?
#### Respuesta
Como estás en el equipo principal, ContaPyme detectará automáticamente que es el servidor local y no necesitarás indicar la IP. Simplemente:
1.  Haz doble clic en el icono de ContaPyme.
2.  Ingresa tu usuario y contraseña.
3.  Selecciona el área de trabajo (si tienes varias).
4.  Verifica que la licencia asignada al usuario sea la correcta.
5.  Haz clic en **Conectar**.

### ¿Cómo me conecto a ContaPyme desde un equipo adicional?
#### Respuesta
En el equipo adicional, después de instalar ContaPyme adicional:
1. Haz doble clic en el icono de ContaPyme. Se abrirá una ventana de conexión.
2. En el campo **Servidor de datos**, ingresa la IP local del equipo principal que consultaste previamente.
3. Haz clic en **Conectar**.
4. Ingresa el usuario y contraseña correspondientes al usuario del equipo adicional.
5. Verifica que el área de trabajo y la licencia sean las correctas.
6. Haz clic en **Conectar**.

### ¿Qué hago si ya ingresé una IP, pero necesito cambiarla en el equipo adicional?
#### Respuesta
Si necesitas cambiar la IP ingresada previamente en el equipo adicional:
1. Haz doble clic en el icono de ContaPyme (si está abierto, ciérralo y vuelve a abrirlo).
2. En la ventana que se abre, busca un icono de computador (usualmente al final del campo **Servidor de datos**) y haz clic en él.
3. Esto te mostrará la ventana inicial de conexión, donde puedes modificar la IP o ingresar el nombre del equipo principal.

### ¿Existe otra forma de conectar los equipos adicionales al equipo principal que no sea utilizando la IP local?
#### Respuesta
Sí, puedes utilizar el nombre del equipo principal en lugar de la IP. Para ello debes:
1. Consultar el nombre del equipo principal.
2. En la ventana de conexión del equipo adicional, ingresar ese nombre en el campo **Servidor de datos**.

### ¿Cómo consultar el nombre del equipo principal?
#### Respuesta
Para consultar el nombre del equipo principal, sigue estos pasos:
1.  En el equipo principal, haz clic en el botón de **Inicio**.
2.  Escribe **Este equipo** y abre la aplicación.
3.  En la ventana de "Este equipo", haz clic derecho en cualquier espacio en blanco y selecciona **Propiedades**.
4.  En la ventana de propiedades, busca la sección **Nombre del equipo**. Allí encontrarás el nombre del equipo que puedes utilizar para la conexión.

### ¿Qué debo hacer si los equipos están en diferentes ubicaciones físicas (diferentes ciudades, por ejemplo)?
#### Respuesta
Si los equipos no están en la misma red local (misma oficina o casa), este método de conexión no funcionará. En ese caso, debes utilizar una conexión a través de Internet, la cual se explica en otro video.

---

# ContaPyme y su funcionamiento técnico
[Ver el video](https://www.youtube.com/watch?v=41eFqEafkg4)
ContaPyme y su funcionamiento técnico

## Tema principal
Explicación del funcionamiento técnico general de ContaPyme en configuraciones de usuario único y multiusuario.

## Resumen general
Este video proporciona una visión general del funcionamiento técnico de ContaPyme. Explica conceptos básicos como qué es ContaPyme, qué es una base de datos y qué es una licencia. Detalla cómo funciona ContaPyme para un solo usuario, donde todo se instala en un solo computador, y cómo funciona para múltiples usuarios, donde se distingue entre un equipo principal (servidor) y equipos adicionales que se conectan al principal. También se mencionan los requisitos necesarios para la instalación y configuración de ContaPyme.

## Preguntas Frecuentes (FAQ)

### ¿Qué es ContaPyme?
#### Respuesta
ContaPyme es un programa contable que se instala en un computador y permite llevar un control total y automatizado de la gestión de una empresa. Se pueden adquirir diferentes módulos, como el contable, el de cartera, el de inventarios y el de activos, entre otros.

### ¿Qué es una base de datos en el contexto de ContaPyme?
#### Respuesta
Una base de datos es donde se almacenan todas las tablas de información contable, incluyendo datos de clientes, proveedores, vendedores, productos, facturas y reportes. Es como una bodega de datos donde reside toda la información de la empresa.

### ¿Qué es una licencia de ContaPyme?
#### Respuesta
Una licencia es un código que otorga el permiso de uso del programa contable. Es una combinación de letras y números que determina a qué módulos tiene acceso el cliente (por ejemplo, contabilidad, cartera, inventarios) y el número de ejecuciones permitidas.

### ¿Qué se le factura al cliente cuando adquiere ContaPyme?
#### Respuesta
Al cliente se le factura una licencia que le da el permiso para usar el programa contable.

### ¿Qué determina la licencia de ContaPyme?
#### Respuesta
La licencia determina los módulos a los que el usuario tiene acceso (por ejemplo, módulo contable, módulo de cartera) y si el programa puede ser usado por un solo usuario o por múltiples usuarios.

### ¿Cómo funciona ContaPyme para un solo usuario?
#### Respuesta
Para un solo usuario, todo se instala en un único computador. El usuario instala el programa ContaPyme, que a su vez instala la base de datos. Luego, registra la licencia o licencias correspondientes. Este conjunto (programa, base de datos y licencias) se conoce como ContaPyme principal.

### ¿Qué es ContaPyme principal?
#### Respuesta
ContaPyme principal se refiere al conjunto de elementos necesarios para que funcione el programa en un computador. Incluye:
1.  La instalación del programa contable.
2.  La base de datos que se instala automáticamente.
3.  El registro de la licencia o licencias correspondientes.

### ¿Cómo funciona ContaPyme para múltiples usuarios?
#### Respuesta
En una configuración multiusuario, se distingue entre un equipo principal (servidor) y equipos adicionales (estaciones de trabajo).
1.  En el equipo principal (servidor), se instala ContaPyme principal, que incluye el programa contable, la base de datos y el registro de las licencias.
2.  En los equipos adicionales, se instala ContaPyme adicional, que es un acceso directo que se conecta al equipo principal. Los equipos adicionales no tienen la base de datos ni las licencias.

### ¿Qué es ContaPyme adicional?
#### Respuesta
ContaPyme adicional es un acceso directo que se instala en los equipos adicionales en una configuración multiusuario.  No incluye la base de datos ni las licencias, y se conecta al equipo principal donde está instalado ContaPyme principal.

### ¿Cómo se comunican los equipos adicionales con el equipo principal en una configuración multiusuario?
#### Respuesta
Los equipos adicionales se conectan al equipo principal (servidor) para acceder a la base de datos y realizar operaciones. Por ejemplo, si un contador necesita un informe, hace la solicitud al equipo principal, que procesa la información y retorna el informe.

### ¿Qué se necesita para instalar y configurar ContaPyme?
#### Respuesta
Se necesita lo siguiente:
1.  Definir los computadores donde se instalará ContaPyme.
2.  Identificar cuál será el equipo principal y cuáles serán los equipos adicionales.
3.  Obtener los instaladores de ContaPyme desde el portal de clientes.
4.  Conocer las licencias que se registrarán, también consultables desde el portal de clientes.
5.  Una conexión a Internet.

---

# Copia de seguridad espejo
[Ver el video](https://www.youtube.com/watch?v=Axpg1rRdSW8)
Axpg1rRdSW8

## Tema principal
Realizar una copia de seguridad espejo en ContaPyme.

## Resumen general
Este video explica cómo realizar una copia de seguridad espejo en ContaPyme. Una copia de seguridad espejo permite guardar una copia adicional de la base de datos en una ubicación diferente a la predeterminada, como un disco duro externo o un servicio de almacenamiento en la nube. El video muestra el proceso paso a paso dentro de ContaPyme para habilitar y configurar la copia de seguridad espejo, asegurando así la protección de los datos en caso de pérdida o daño del equipo.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una copia de seguridad?
#### Respuesta
Una copia de seguridad es un archivo generado por ContaPyme que contiene toda la información de tu base de datos. El objetivo es poder recuperar toda tu información en caso de pérdida o daño del equipo, desde cualquier computador que tenga instalado ContaPyme.

### ¿Qué es una copia de seguridad espejo?
#### Respuesta
Una copia de seguridad espejo es una copia adicional de la base de datos que se guarda en una ubicación diferente a la predeterminada. Esto permite tener dos copias de seguridad, lo cual es útil para guardar una copia en un disco duro extraíble, una memoria USB o un servicio de almacenamiento en la nube (drive) como Google Drive o OneDrive.

### ¿Cómo habilito y configuro la copia de seguridad espejo en ContaPyme?
#### Respuesta
Para habilitar y configurar la copia de seguridad espejo, sigue estos pasos:
1.  Haz clic en el botón **Aplicación** (parte superior izquierda).
2.  Haz clic en **Configuración**.
3.  Busca el apartado **Configuración general de copias de seguridad**.
4.  Selecciona **Copias de seguridad espejo**.
5.  Habilita la opción **manejo de copias de seguridad espejo**.
6.  Haz clic en el ícono de la carpeta para seleccionar la ruta donde se guardará la copia espejo.
7.  Busca la ubicación deseada (por ejemplo, una unidad USB o una carpeta en el disco duro).
8.  Haz clic en **Aceptar**.

### ¿Cómo se realiza la copia de seguridad (tanto la predeterminada como la espejo)?
#### Respuesta
Para realizar la copia de seguridad:
1.  Haz clic en el botón **Aplicación**.
2.  Haz clic en **Hacer copia de seguridad**.
    El sistema generará la copia de seguridad en la ruta predeterminada y en la ruta de la copia de seguridad espejo.

### ¿Cómo puedo verificar que la copia de seguridad espejo se haya creado correctamente?
#### Respuesta
Después de realizar la copia de seguridad, el sistema mostrará una ventana de información indicando que se realizaron ambas copias. Para verificarlo, busca en la ruta que configuraste para la copia de seguridad espejo y asegúrate de que el archivo de la copia de seguridad esté presente. En el ejemplo del video, se busca en la unidad USB dentro de la carpeta "Copias de seguridad Contapyme".

---

# Copias de seguridad por tiempo específico o en horas programadas
[Ver el video](https://www.youtube.com/watch?v=tPqUAlUfScw)

## Tema principal
Configuración de copias de seguridad automáticas en ContaPyme.

## Resumen general
Este video explica cómo configurar copias de seguridad automáticas en ContaPyme. Muestra cómo programar copias de seguridad basadas en un intervalo de tiempo específico (por ejemplo, cada hora o cada dos horas) o en una hora programada (por ejemplo, a las 5 de la tarde). También describe las consideraciones importantes que se deben tener en cuenta para que las copias de seguridad se realicen correctamente, como el tiempo de inactividad necesario en el sistema.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a la configuración de las copias de seguridad automáticas en ContaPyme?
#### Respuesta
Para acceder a la configuración de copias de seguridad automáticas, sigue estos pasos:
1. Haz clic en el botón **Aplicación** (ubicado en la parte superior izquierda de la pantalla).
2. Selecciona la opción **Configuración**.
3. Busca y selecciona la opción **Configuración General de Copias de Seguridad**.
4. Haz clic en **Copias de Seguridad Automáticas**.

### ¿Cómo configuro ContaPyme para que haga una copia de seguridad cada cierto tiempo (por ejemplo, cada hora)?
#### Respuesta
Para configurar copias de seguridad basadas en un tiempo especificado, sigue estos pasos:
1.  Accede a la configuración de copias de seguridad automáticas (ver pregunta anterior).
2.  Selecciona la opción **Hacer copias según el tiempo especificado**.
3.  Ingresa el intervalo de tiempo deseado en minutos. Por ejemplo, para que la copia se haga cada hora, ingresa "60". Para cada dos horas, ingresa "120".

### ¿Cómo programo ContaPyme para que haga una copia de seguridad a una hora específica?
#### Respuesta
Para programar una copia de seguridad a una hora específica, sigue estos pasos:
1. Accede a la configuración de copias de seguridad automáticas (ver pregunta anterior).
2. Selecciona la opción **Hacer copias según las horas programadas**.
3. Ingresa la hora deseada para la copia de seguridad.

### ¿ContaPyme me avisará antes de realizar la copia de seguridad programada?
#### Respuesta
Sí, puedes configurar el sistema para que te muestre una ventana de autocopia unos segundos antes de que se realice la copia de seguridad. Esto te da la posibilidad de cancelar la copia si lo deseas. Para activarlo, marca la opción correspondiente en la configuración de copias de seguridad automáticas.

### ¿Qué condiciones deben cumplirse para que ContaPyme realice la copia de seguridad automática?
#### Respuesta
Para que la copia de seguridad se realice automáticamente, deben cumplirse las siguientes condiciones:
1. Debe haber al menos **1 minuto de inactividad** en el sistema. Esto significa que no se debe estar creando un tercero, realizando modificaciones o cualquier otra acción dentro del sistema.
2. No debes estar realizando ningún proceso, como **procesar una factura o enviar una factura a la DIAN**. El sistema no interrumpirá estas operaciones para realizar la copia.
3. **No debes tener ninguna ventana abierta** que corresponda a una operación del sistema.

---

# Creación de usuarios y asignación de licencias
[Ver el video](https://www.youtube.com/watch?v=o49Sh93o3H0)

## Tema principal
Crear usuarios en ContaPyme y asignar licencias a cada uno.

## Resumen general
Este video explica cómo crear usuarios en ContaPyme y asignarles licencias específicas. Se aprende a acceder al catálogo de usuarios, crear un nuevo usuario, configurar su perfil, asignar una licencia disponible y entender las opciones básicas de configuración para que el usuario pueda acceder al sistema. Se destaca la importancia de asignar el perfil correcto según las funciones del usuario y de gestionar las licencias para asegurar el acceso al programa.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo al catálogo de usuarios en ContaPyme?
#### Respuesta
Para acceder al catálogo de usuarios debes:
1.  Ubicarte en la pestaña **Básico**.
2.  Dar clic en **Catálogo de Usuarios**.

### ¿Cuál es el usuario que aparece por defecto al ingresar al catálogo de usuarios?
#### Respuesta
El usuario que aparece por defecto es el usuario **Admin**. Este usuario se crea automáticamente con la instalación del programa ContaPyme.

### ¿Cómo creo un nuevo usuario en ContaPyme?
#### Respuesta
Para crear un nuevo usuario:

1.  Dirígete al **Catálogo de Usuarios**.
2.  Haz clic en el botón **Crear** en la cinta de opciones o haz clic derecho y selecciona **Crear**.
3.  Ingresa el **código** para el nuevo usuario y haz clic en **Aceptar**.
4.  En la ventana de registro, completa los campos obligatorios (en blanco): **nombre, apellido y perfil**.
5.  Completa los campos opcionales (en verde).
6.  Navega por las pestañas **Definición, Datos de Usuario y Licencias** para configurar el usuario.
7.  Haz clic en **Aceptar** para guardar el nuevo usuario.

### ¿Qué significan los colores de los campos en la ventana de registro de usuario?
#### Respuesta
Los campos en color **blanco** son **obligatorios** y los campos en color **verde** son **opcionales**.

### ¿Cómo elijo el perfil adecuado para un usuario?
#### Respuesta
El perfil se elige según las funciones que el usuario va a desempeñar en el sistema. Por ejemplo:

*   Un perfil **Administrador** tiene acceso a todas las funciones.
*   Un perfil **Auditor** puede visualizar y auditar, pero no modificar.
*   Un perfil **Auxiliar Contable** puede trabajar y digitar asientos contables.

### ¿Cómo configuro la contraseña de un nuevo usuario?
#### Respuesta
En la pestaña **Definición**, opción **General**:

1.  Ingresa la **contraseña** deseada y confírmala.
2.  Si quieres que el usuario cambie la contraseña en su primer inicio de sesión, marca la opción **Modificar contraseña en el próximo inicio**. Si le asignas una contraseña directamente, desmarca esta opción.
3.  Define la fecha de inicio y, opcionalmente, la fecha de expiración de la cuenta.

### ¿Qué debo configurar en la pestaña "Datos de usuario"?
#### Respuesta
En la pestaña **Datos de usuario**, es importante ingresar el **correo electrónico** del usuario, activar la casilla si **autoriza las políticas de tratamiento de información** y, opcionalmente, puedes ingresar el teléfono, celular y Skype.

### ¿Cómo asigno una licencia a un usuario?
#### Respuesta
Para asignar una licencia a un usuario:

1.  Dirígete a la pestaña **Licencias** dentro de la ventana de registro del usuario.
2.  Selecciona la **licencia** que deseas asignar al usuario.
3.  Define la fecha de inicio y, opcionalmente, la fecha de finalización para el uso de la licencia.
4.  Haz clic en **Aceptar**.

### ¿Cómo puedo saber qué módulos incluye cada licencia?
#### Respuesta
Para consultar los módulos que incluye cada licencia:

1.  Ubícate sobre la licencia en la pestaña **Licencias**.
2.  Haz clic en el icono de información (**i**) que aparece en la parte superior.

### ¿Puedo asignar la misma licencia a varios usuarios?
#### Respuesta
Sí, varios usuarios pueden tener la misma licencia, pero **no pueden ingresar al sistema al mismo tiempo**, a menos que la licencia tenga múltiples ejecuciones simultáneas. Si todos los usuarios necesitan trabajar al mismo tiempo, lo recomendable es que cada uno tenga su propia licencia.

### ¿Para qué sirven los grupos de usuarios?
#### Respuesta
Los grupos de usuarios sirven para clasificar a los usuarios cuando hay muchos. Por ejemplo, puedes crear un grupo "Contable" y asignar a todos los usuarios que pertenecen al departamento contable a ese grupo. Esta opción es opcional.

---

# Creación de áreas de trabajo
[Ver el video](https://www.youtube.com/watch?v=Kblyqf7B4_4)
Creación de nuevas áreas de trabajo

## Tema principal
Creación de nuevas áreas de trabajo en ContaPyme para el manejo de empresas independientes.

## Resumen general
Este video explica cómo crear áreas de trabajo en ContaPyme. Un área de trabajo es un espacio reservado en el equipo donde se pueden crear una o varias empresas. El video muestra cómo acceder a la configuración de áreas de trabajo, crear una nueva área, configurar el país y el PUC, y cómo acceder a la nueva área de trabajo una vez creada. También enfatiza la importancia de mantener las áreas de trabajo separadas para empresas independientes y la ubicación por defecto de las áreas de trabajo.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un área de trabajo en ContaPyme?
#### Respuesta
Un área de trabajo es un espacio físico reservado en el equipo principal donde se puede crear una o varias empresas, dependiendo del licenciamiento y de la información que se comparta entre ellas.

### ¿Dónde se guardan las carpetas de las áreas de trabajo en ContaPyme?
#### Respuesta
Por defecto, la carpeta del área de trabajo se guarda en una ruta específica durante la instalación de ContaPyme. Se recomienda no modificar esta ruta. Cuando se crean nuevas áreas de trabajo, se guardan en la misma ubicación.

### ¿Cómo se crean nuevas áreas de trabajo en ContaPyme?
#### Respuesta
Para crear nuevas áreas de trabajo, sigue estos pasos:

1.  Da clic en el **botón de aplicación** (parte superior izquierda).
2.  Selecciona **Servidor**.
3.  Haz clic en **Catálogo de áreas de trabajo**.
4.  Haz clic en el botón **Crear** (en la cinta de opciones) o haz clic derecho sobre el espacio en blanco y selecciona **Crear**.
5.  Indica la **identificación** del área de trabajo (p. ej., "Área de trabajo 2" o el nombre de la empresa).
6.  Haz clic en **Aceptar**.

### ¿Qué configuraciones se deben realizar al crear un área de trabajo?
#### Respuesta
Después de crear el área de trabajo, debes configurar lo siguiente:

1.  Verificar que el área de trabajo esté **activa** (viene activada por defecto).
2.  Indicar el **país**.
3.  En **Configuración**, selecciona el **PUC** (Plan Único de Cuentas) que se utilizará (Comerciantes o Sector Solidario).
4.  Selecciona el **grupo NIIF** al que pertenece la empresa.
5.  Opcionalmente, agrega una **descripción** del área de trabajo.
6.  Verifica la **ubicación** donde se guardará el área de trabajo (se recomienda dejar la ruta por defecto).
7.  Haz clic en **Aceptar**.

### ¿Qué PUC puedo usar en ContaPyme?
#### Respuesta
ContaPyme tiene dos PUC por defecto: el PUC para Comerciantes y el PUC para el Sector Solidario. Si necesitas uno diferente, puedes descargar y modificar uno de los PUC existentes, pero esa opción no se detalla en este video.

### ¿Es recomendable modificar la ubicación por defecto de las áreas de trabajo?
#### Respuesta
No, no es recomendable modificar la ubicación por defecto donde se guardan las áreas de trabajo. Se recomienda dejarla en la ruta predeterminada.

### ¿Cuándo es recomendable tener empresas en áreas de trabajo separadas?
#### Respuesta
Es recomendable tener empresas en áreas de trabajo separadas cuando son totalmente independientes y no comparten terceros, elementos de inventarios o cuentas. Si las empresas comparten esta información, pueden estar en la misma área de trabajo.

### ¿Cómo se accede a un área de trabajo creada?
#### Respuesta
Para acceder a un área de trabajo creada, puedes cerrar y volver a abrir ContaPyme, o simplemente volver a abrir ContaPyme. Luego:

1.  En la ventana de inicio, haz clic en las **flechas** para desplegar la lista de áreas de trabajo.
2.  Selecciona el **área de trabajo** a la que deseas conectarte.
3.  Selecciona la **licencia** correspondiente.
4.  Ingresa con el **usuario** correspondiente.
5.  Indica una nueva **contraseña**, confírmala, y dale clic en **Conectar**.

### ¿Qué sucede al ingresar por primera vez a un área de trabajo nueva?
#### Respuesta
Al ingresar por primera vez a un área de trabajo nueva, ContaPyme genera una copia de seguridad. Luego, ingresas al sistema completamente en blanco, listo para ser parametrizado y crear la empresa, tal como lo hiciste la primera vez que instalaste ContaPyme.

---

# Generación de copias de seguridad manuales y automáticas
[Ver el video](https://www.youtube.com/watch?v=mSEf2R-MmFg)

## Tema principal
Aprender a generar copias de seguridad de forma automática y manual en ContaPyme para proteger la información ante cualquier pérdida o incidente.

## Resumen general
Este video explica cómo realizar copias de seguridad en ContaPyme, tanto de forma automática como manual. Se detalla la importancia de las copias de seguridad para la recuperación de datos, los formatos disponibles (FBK y ZIP), y cómo configurar la periodicidad y ubicación de las copias automáticas. También se muestran dos métodos manuales para generar copias: uno que guarda la copia en la ruta predeterminada del sistema y otro que permite seleccionar una ruta específica.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una copia de seguridad en ContaPyme?
#### Respuesta
Una copia de seguridad es un proceso de duplicado de datos o información de ContaPyme que se realiza con el fin de recuperarlos ante cualquier pérdida o incidente. Es un respaldo que permite continuar trabajando si la base de datos principal se daña.

### ¿En qué formatos se pueden guardar las copias de seguridad en ContaPyme?
#### Respuesta
Existen dos tipos de formatos:
- **.FBK:** Es un archivo único. Si este archivo se corrompe, la información se pierde.
- **.ZIP:** Es una carpeta comprimida que contiene la base de datos y una copia en formato FBK. Es más seguro porque permite recuperar la información incluso si uno de los archivos se daña.

### ¿Cómo configuro las copias de seguridad automáticas en ContaPyme?
#### Respuesta
Sigue estos pasos:
1. Ve al **botón de aplicación** (esquina superior izquierda).
2. Haz clic en **Configuración**.
3. Selecciona **"Para todos los usuarios"**.
4. En la ventana de configuración, en la parte izquierda, selecciona **"Configuración general de copias de seguridad"**.
5. En **"Periodicidad de generación de copias"**, activa las opciones:
    - **"Hacer copia de seguridad automáticamente cuando inicie sesión el primer usuario"**.
    - **"Hacer copia de seguridad automáticamente cuando finalice sesión el último usuario"**.
6. En **"Tipo de copia a realizar"**, asegúrate de que esté seleccionado **".ZIP"**.
7. Activa la opción **"En las copias de seguridad ZIP incluir una copia redundante de la base de datos"**.
8. Haz clic en **"Aceptar"**.

### ¿Dónde se almacenan las copias de seguridad automáticas en ContaPyme?
#### Respuesta
La ruta de almacenamiento de las copias de seguridad automáticas se encuentra en la configuración del sistema. Para encontrarla, sigue estos pasos:
1. Ve al **botón de aplicación** (esquina superior izquierda).
2. Haz clic en **Configuración**.
3. Selecciona **"Para todos los usuarios"**.
4. En la ventana de configuración, en la parte izquierda, selecciona **"Personalización de ubicación de archivos"**.
5. Busca la opción **"Ubicación de copias de seguridad automáticas en el servidor de datos"**. Ahí verás la ruta donde se guardan las copias.

### ¿Cómo hago una copia de seguridad manual en ContaPyme que se guarde en la ruta predeterminada?
#### Respuesta
Sigue estos pasos:
1. Ve al **botón de aplicación** (esquina superior izquierda).
2. Haz clic en **"Hacer copia de seguridad"**.
La copia se guardará automáticamente en la ruta predeterminada del sistema. Aparecerá un mensaje indicando que la copia se ha realizado correctamente y mostrando la ruta.

### ¿Cómo hago una copia de seguridad manual en ContaPyme y elijo dónde guardarla?
#### Respuesta
Sigue estos pasos:
1. Ve al **botón de aplicación** (esquina superior izquierda).
2. Haz clic en **"Servidor"**.
3. Selecciona **"Explorador de copias de seguridad"**.
4. En la ventana del explorador, haz clic en **"Nueva"**.
5. Se abrirá una ventana para que selecciones la ruta donde quieres guardar la copia y le asignes un nombre.
6. Haz clic en **"Guardar"**.
ContaPyme realizará la copia de seguridad en la ruta especificada.

---

# Ingreso a ContaPyme por primera vez
[Ver el video](https://www.youtube.com/watch?v=lVTV08c5MMY)
lVTV08c5MMY

## Tema principal
Configuración inicial de ContaPyme al ingresar por primera vez.

## Resumen general
Este video explica cómo ingresar a ContaPyme por primera vez después de la instalación. Muestra el proceso de configuración inicial del área de trabajo, incluyendo la selección del país, el PUC (Plan Único de Cuentas), el grupo NIIF, y la asignación de un nombre y ubicación al área de trabajo. También cubre el inicio de sesión con el usuario por defecto, la creación de una copia de seguridad inicial, y el acceso a la interfaz principal del sistema.

## Preguntas Frecuentes (FAQ)

### ¿Qué debo hacer si la ventana de configuración de ContaPyme no se abre automáticamente después de la instalación?
#### Respuesta
Si la ventana de configuración no se abre automáticamente después de finalizar la instalación, busca el icono de ContaPyme en el escritorio o en el menú de inicio de Windows. Dale doble clic al icono para ejecutar el programa y abrir el asistente de configuración.

### ¿Qué debo seleccionar en la configuración inicial en la opción "PUC"?
#### Respuesta
Debes seleccionar el PUC (Plan Único de Cuentas) que corresponda a tu empresa. Tienes dos opciones:
- **PUC para comerciantes:** Es el más común y utilizado.
- **PUC para el sector solidario:** Debes seleccionar esta opción si tu empresa pertenece al sector solidario.

### ¿Qué debo seleccionar en la configuración inicial en la opción "Grupo NIIF"?
#### Respuesta
Debes indicar el grupo NIIF (Normas Internacionales de Información Financiera) al que pertenece tu empresa. Si no vas a manejar NIIF, puedes seleccionar la opción de no activar NIIF, pero no es lo más recomendado.

### ¿Puedo cambiar el nombre y la ubicación del área de trabajo en la configuración inicial?
#### Respuesta
Sí, puedes modificar el nombre del área de trabajo en el campo correspondiente. También puedes cambiar la ubicación donde se almacenará el área de trabajo haciendo clic en el icono de la carpeta y buscando la ruta deseada. Sin embargo, se recomienda dejar la ruta por defecto.

### ¿Cuál es el usuario y la contraseña por defecto para ingresar a ContaPyme por primera vez?
#### Respuesta
El usuario por defecto es **admin**. Debes establecer una nueva contraseña al ingresar por primera vez.

### ¿Qué debo hacer cuando el sistema muestra una advertencia sobre licencias próximas a vencerse?
#### Respuesta
Haz clic en "Continuar con el inicio del sistema" para ingresar a ContaPyme. La activación de las licencias se explicará en otro video.

### ¿Por qué ContaPyme realiza una copia de seguridad al ingresar por primera vez?
#### Respuesta
ContaPyme realiza una copia de seguridad automática al ingresar por primera vez para tener un respaldo de la información en caso de pérdida o daño.

### ¿Qué debo hacer al ingresar al sistema y ver la recomendación de copia de seguridad de espejo?
#### Respuesta
Puedes darle click en "Configurar en otro momento". La configuración de la copia de seguridad de espejo se explicará en otro video.

---

# Instalación de ContaPyme principal
[Ver el video](https://www.youtube.com/watch?v=vFFkwsIhL7s)
[Instalación de ContaPyme principal]

## Tema principal
Instalación del programa ContaPyme principal, incluyendo la descarga del instalador, la configuración inicial y el registro de la licencia principal.

## Resumen general
Este video explica paso a paso cómo instalar ContaPyme principal desde el portal de clientes de Insof.  El video detalla cómo descargar el instalador, ejecutarlo, aceptar los términos de licencia, elegir las rutas de instalación (tanto para el programa como para la base de datos), seleccionar la opción de instalación "ContaPyme principal", ingresar la licencia servidor, y completar la configuración inicial al ejecutar el programa por primera vez, incluyendo la selección del país, el PUC y el grupo NIIF. Al finalizar la instalación, el video muestra cómo acceder al sistema.

## Preguntas Frecuentes (FAQ)

### ¿Dónde se descarga el instalador de ContaPyme?
#### Respuesta
El instalador de ContaPyme se descarga desde el portal de clientes de ContaPyme. Para descargarlo, sigue estos pasos:
1.  Ingresa a [ContaPyme.com](https://www.contapyme.com/).
2.  En la parte superior derecha, da clic en **Portal Clientes**.
3.  Inicia sesión con tu cuenta registrada ante Insof (correo y contraseña).
4.  Selecciona la empresa a la cual estás asociado y da clic en **Aceptar**.
5.  En el menú del lado izquierdo, navega a la pestaña **Instaladores**.
6.  Da clic en el botón **Descargar Contapyme**.

### ¿Dónde encuentro mis licencias de ContaPyme?
#### Respuesta
Las licencias de ContaPyme se encuentran en el portal de clientes, dentro de la sección "Mis licencias". Sigue estos pasos:
1.  Ingresa a [ContaPyme.com](https://www.contapyme.com/).
2.  En la parte superior derecha, da clic en **Portal Clientes**.
3.  Inicia sesión con tu cuenta registrada ante Insof (correo y contraseña).
4.  Selecciona la empresa a la cual estás asociado y da clic en **Aceptar**.
5.  En el menú del lado izquierdo, busca la pestaña **Mis licencias**. Allí encontrarás la licencia principal o licencia servidor.

### ¿Qué diferencia hay entre ContaPyme principal y ContaPyme adicional?
#### Respuesta
**ContaPyme principal** es la instalación completa que incluye el programa, la base de datos y la capacidad de registrar las licencias.  **ContaPyme adicional** es simplemente un acceso directo que se conecta a una instalación de ContaPyme principal existente. No contiene la base de datos ni permite el registro de licencias.

### ¿Cómo se instala ContaPyme principal?
#### Respuesta
Para instalar ContaPyme principal, sigue estos pasos:
1.  Descarga el instalador desde el portal de clientes (ver la pregunta "¿Dónde se descarga el instalador de ContaPyme?").
2.  Ejecuta el instalador (normalmente se encuentra en la carpeta de descargas).
3.  Sigue las instrucciones del asistente de instalación.
4.  Acepta los términos del acuerdo de licenciamiento y da clic en **Siguiente**.
5.  Deja las rutas de instalación por defecto tanto para el programa como para la base de datos y da clic en **Siguiente** en cada caso.
6.  Selecciona la opción **ContaPyme principal** y da clic en **Siguiente**.
7.  Selecciona si deseas participar en la recopilación de estadísticas de uso (se recomienda dar clic en **Sí**) y da clic en **Siguiente**.
8.  Ingresa la licencia servidor o licencia principal (copiada del portal de clientes, sección Mis licencias) y da clic en **Siguiente**.
9.  Espera a que el sistema complete la instalación.
10. Da clic en **Finalizar**.

### ¿Qué información debo ingresar en la primera ejecución de ContaPyme?
#### Respuesta
En la primera ejecución de ContaPyme, debes ingresar la siguiente información:
1.  **País** donde se encuentra la empresa.
2.  **PUC** (Plan Único de Cuentas). Si seleccionas Colombia, tendrás acceso al PUC para comerciantes y al PUC para el sector solidario. En otros países aparecerá un PUC internacional.
3.  **Grupo NIIF** al que pertenece la empresa.
4.  Da clic en **Crear área de trabajo**.

### ¿Qué debo hacer después de instalar ContaPyme principal?
#### Respuesta
Después de instalar ContaPyme principal, si adquiriste solamente una licencia, ésta debió quedar registrada en el proceso de instalación.  Solo faltaría activar la licencia y empezar a trabajar. Si tienes varias licencias, debes registrarlas en el sistema.

---

# Licencia servidor y licencia cliente
[Ver el video](https://www.youtube.com/watch?v=zfzxmGHAQU8)
zfzxmGHAQU8

## Tema principal
Identificación y registro de licencias servidor y cliente en ContaPyme.

## Resumen general
Este video explica cómo identificar las licencias servidor (principal) y cliente (adicionales) al adquirir ContaPyme. Muestra dónde encontrar estas licencias, ya sea en la factura enviada por Insoft o en el portal de clientes de ContaPyme. El video detalla cómo distinguir entre licencias servidor y cliente y qué información contienen sobre los módulos habilitados para cada una. Finalmente, menciona que la licencia servidor es la primera que debe instalarse.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una licencia de ContaPyme?
#### Respuesta
Una licencia es un código alfanumérico que otorga permiso para usar el programa ContaPyme. Este código determina a qué módulos tiene acceso el cliente (por ejemplo, contabilidad, inventarios, activos) y el número de ejecuciones permitidas del software.

### ¿Cuándo es necesario identificar si una licencia es servidor o cliente?
#### Respuesta
Es necesario identificar si una licencia es servidor o cliente cuando se adquieren más de una licencia de ContaPyme. Si solo se adquiere una licencia, esta siempre será una licencia servidor (principal).

### ¿Cuál es la diferencia entre una licencia servidor y una licencia cliente?
#### Respuesta
Una licencia servidor (o principal) es la licencia base que incluye un paquete completo de módulos o el módulo principal. Una licencia cliente (o adicional) se utiliza para dar acceso a usuarios adicionales a módulos específicos o al mismo paquete que la licencia servidor.

### ¿Cómo puedo identificar si una licencia es servidor o cliente?
#### Respuesta
Hay dos maneras de identificar el tipo de licencia:
1.  **Factura de Insoft:** En la factura que Insoft envía por correo electrónico, se especifica si cada licencia es "servidor" o "cliente" en la descripción de la licencia.
2.  **Portal de Clientes ContaPyme:** Al ingresar al portal de clientes, en la sección "Mis Licencias", cada licencia muestra en su edición si es "servidor" o "cliente".

### ¿Dónde puedo encontrar mis licencias de ContaPyme?
#### Respuesta
Puedes encontrar tus licencias de dos formas:
1.  **Correo electrónico:** Revisa la bandeja de entrada del correo electrónico que registraste ante Insoft. Busca un correo con la factura de venta, donde se detallan las licencias adquiridas en la sección de observaciones.
2.  **Portal de clientes:** Ingresa al portal de clientes de ContaPyme.

### ¿Cómo ingreso al portal de clientes de ContaPyme?
#### Respuesta
Para ingresar al portal de clientes de ContaPyme, sigue estos pasos:
1.  Ve a la página web [www.contapyme.com](www.contapyme.com).
2.  Haz clic en la opción **Portal Clientes** en la esquina superior derecha.
3.  Inicia sesión con el correo electrónico registrado ante Insoft y la contraseña correspondiente. Si no recuerdas la contraseña, haz clic en **Solicitar Contraseña** para recibir una nueva contraseña en tu correo.
4.  Selecciona la empresa a la que están asociadas las licencias y haz clic en **Aceptar**.

### ¿Cómo visualizo mis licencias dentro del portal de clientes?
#### Respuesta
Una vez que hayas ingresado al portal de clientes, sigue estos pasos:
1.  Ubícate en el menú del lado izquierdo.
2.  Haz clic en la opción **Mis Licencias**.
3.  En esta sección, podrás ver todas las licencias adquiridas, su tipo (servidor o cliente) y los módulos que incluye cada una.

### ¿En qué orden debo instalar las licencias de ContaPyme?
#### Respuesta
Debes instalar primero la licencia que se identifica como "servidor" o "principal". Generalmente, la primera licencia en la lista es la licencia servidor.

### ¿Dónde se indica qué módulos están incluidos en cada licencia dentro del portal de clientes?
#### Respuesta
Dentro del portal de clientes, una vez que has accedido a **Mis Licencias**, al seleccionar cada licencia, se muestran los módulos habilitados para esa licencia en la parte inferior de la información de la licencia. Los módulos desactivados no estarán visibles o aparecerán como deshabilitados.

---

# Personalización de documentos de impresión
[Ver el video](https://www.youtube.com/watch?v=yluO841m7gw)
yluO841m7gw

## Tema principal
Personalización de documentos de impresión en ContaPyme, con enfoque en la factura de venta.

## Resumen general
Este video explica cómo personalizar los documentos de impresión en ContaPyme, centrándose en la factura de venta. Se detalla cómo agregar un logo, la información de la empresa en el encabezado y, para usuarios de facturación electrónica, cómo incluir el CUFE y el código QR en un diseño ya personalizado. Además, se explica cómo agregar observaciones, como la información de la resolución de facturación, y cómo asegurarse de que se utilice el documento personalizado en la facturación electrónica. El video enfatiza la importancia de duplicar los documentos antes de realizar cambios para tener un respaldo.

## Preguntas Frecuentes (FAQ)

### ¿Dónde se encuentran los documentos de impresión en ContaPyme?
#### Respuesta
Para acceder a los documentos de impresión en ContaPyme, debes seguir estos pasos:

1.  Dirígete a la pestaña **Básico**.
2.  Selecciona el catálogo de **Documentos de Impresión**.

### ¿Qué elementos de un documento de impresión se pueden personalizar?
#### Respuesta
Se pueden personalizar varios elementos, incluyendo:

*   El logo de la empresa.
*   La información de la empresa (nombre, dirección, NIT, etc.).
*   El encabezado del documento.
*   El CUFE y el código QR (para facturación electrónica).
*   Observaciones (como la información de la resolución de facturación).

### ¿Por qué es importante duplicar un documento antes de personalizarlo?
#### Respuesta
Es crucial duplicar un documento antes de cualquier modificación para tener un respaldo en caso de que la configuración se dañe o se realice algún cambio no deseado. Así, se puede recuperar la configuración anterior.

### ¿Cómo se duplica un documento de impresión en ContaPyme?
#### Respuesta
Para duplicar un documento de impresión, sigue estos pasos:

1.  Ubica el documento que deseas duplicar.
2.  Haz clic derecho sobre el documento.
3.  Selecciona la opción **Duplicar**.
4.  El sistema te pedirá un código. Ingresa un código que no exista previamente.
5.  El sistema duplicará el documento con la personalización que tenga hasta el momento.

### ¿Cómo se activa la opción de diseño personalizado de un documento?
#### Respuesta
Para activar la opción de diseño personalizado, sigue estos pasos:

1.  Ingresa al documento que deseas personalizar (doble clic o clic derecho y **Modificar**).
2.  Dirígete a la pestaña **Diseño de Documento**.
3.  Activa la opción **Desea crear un diseño personalizado a partir de la plantilla base**.

### ¿Cómo se agrega el logo de la empresa al encabezado del documento?
#### Respuesta
Para agregar el logo, sigue estos pasos:

1.  Abre el documento y entra al **Diseño del documento**.
2.  Activa la opción **Desea crear un diseño personalizado a partir de la plantilla base**.
3.  Ingresa a **Doc Principal**.
4.  Elimina los campos existentes en la sección de encabezado.
5.  Ajusta el espacio del encabezado moviendo la banda del detalle hacia abajo y seleccionando y moviendo los campos con la tecla **Control** y la flecha hacia abajo.
6.  Selecciona el icono de **Imagen** y suéltalo en el encabezado.
7.  Amplía la imagen al tamaño deseado (recuerda que el tamaño del logo debe ser ajustado previamente en una aplicación de edición de imágenes).
8.  Haz clic derecho sobre la imagen y selecciona 'Picture'.
9.  Busca y selecciona el archivo del logo en tu computador.
10. Ajusta la posición del logo con el mouse o con las teclas **Control** y las flechas de dirección.

### ¿Cómo se agrega la información de la empresa en el encabezado del documento?
#### Respuesta
Para agregar la información de la empresa, sigue estos pasos:

1.  Abre el documento y entra al **Diseño del documento**.
2.  Activa la opción **Desea crear un diseño personalizado a partir de la plantilla base**.
3.  Ingresa a **Doc Principal**.
4.  Minimiza el tamaño de los campos de "Nombre del documento" y "Número de documento" seleccionándolos con el mouse, luego con la tecla **Shift** da clic en el recuadro principal para quitarle la selección y luego con la tecla **Shift** y la flecha hacia la izquierda reducir el tamaño.
5.  Mueve la selección anterior al lugar deseado en el encabezado con **Control** y las flechas de dirección.
6.  Selecciona el icono de **Rich Text** (la hoja con la A) y suéltalo en el encabezado.
7.  Haz clic derecho sobre el campo y selecciona **Editar**.
8.  Copia y pega la información de tu empresa (nombre, NIT, dirección, teléfono, página web, etc.) en el editor.
9.  Ajusta el formato (tamaño de letra, color, alineación, negrilla, etc.) según sea necesario.
10. Cierra el editor y guarda los cambios.
11. Ajusta la posición y el tamaño del campo de texto con **Control** (para mover) y **Shift** (para cambiar el tamaño) junto con las flechas de dirección.

### ¿Cómo se agrega el CUFE y el código QR para facturación electrónica a un diseño ya personalizado?
#### Respuesta
Si ya tienes un diseño personalizado y necesitas agregar el CUFE y el código QR para facturación electrónica, sigue estos pasos:

1.  Abre el documento de impresión llamado **Factura de Venta Electrónica** (que ya tiene el CUFE y el código QR).
2.  Ingresa al **Diseño del Documento** y luego a **Doc Principal**.
3.  Selecciona toda la sección que contiene las firmas, el CUFE y el código QR, ubicada en la parte inferior.
4.  Presiona **Control + C** para copiar la selección.
5.  Cierra el documento de Factura de Venta Electrónica.
6.  Abre tu documento personalizado.
7.  Ingresa al **Diseño del Documento** y luego a **Doc Principal**.
8.  Elimina la sección existente de código de barras y firmas.
9.  Abre espacio en el **Footer** (pie de página) arrastrando la banda hacia abajo.
10. Presiona **Control + V** para pegar la información copiada en el Footer.
11. Ajusta la posición del Footer y del contenido pegado.

### ¿Por qué el CUFE y el código QR deben estar en el pie de página (Footer)?
#### Respuesta
El CUFE y el código QR deben estar en el pie de página (Footer) porque esta sección se repite en todas las páginas del documento. Dado que la información de facturación electrónica debe estar presente en cada página, es necesario ubicarla en el Footer.

### ¿Cómo se agregan observaciones (como la información de la resolución de facturación) al documento?
#### Respuesta
Para agregar observaciones, sigue estos pasos:

1.  Abre el documento personalizado.
2.  Cierra la ventana de **Doc Principal**, si está abierta.
3.  Dirígete a la pestaña **Observaciones**.
4.  Digita la información que deseas incluir (número de resolución, fechas, vigencia, prefijo, rangos, información de cuentas bancarias, etc.).
5.  Guarda los cambios (**Aceptar**).

### ¿Cómo se asegura que el sistema utilice el documento personalizado en la facturación electrónica?
#### Respuesta
Para asegurarte de que el sistema utilice el documento personalizado para las facturas electrónicas, debes configurar el documento de soporte de factura de venta electrónica:

1.  Ingresa al documento de **Soporte de Factura de Venta Electrónica**.
2.  Cambia el documento predeterminado por el documento personalizado que creaste.
3.  Guarda los cambios (**Aceptar**).

---

# Presentación API Agente Servicios Web ContaPyme
[Ver el video](https://www.youtube.com/watch?v=_9YYPUdz4Z0)

## Tema principal
Integración de sistemas externos con ContaPyme a través de la API (Agente de Servicios Web).

## Resumen general
El video explica qué es la API de ContaPyme, a quién está dirigida, la documentación disponible y cómo adquirirla. Se introduce el concepto de la API como un puente de comunicación entre ContaPyme y sistemas externos (páginas web, sistemas de nómina, etc.), permitiendo el envío y la extracción de información (clientes, productos, registros contables, etc.). Además, se detalla la estructura técnica de la API, su funcionamiento con el software, y cómo se consumen las funciones para integrar diferentes catálogos y operaciones. Finalmente, se explica cómo adquirir la API, diferenciando entre un cliente desarrollador y un aliado desarrollador.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la API de ContaPyme?
#### Respuesta
La API de ContaPyme (Agente de Servicios Web) es un puente de comunicación que permite integrar sistemas externos, como páginas web, carritos de compras, sistemas de nómina o aplicaciones móviles, con el software ContaPyme. Facilita el envío de información hacia ContaPyme y la extracción de información desde ContaPyme.

### ¿A quién está dirigida la API de ContaPyme?
#### Respuesta
La API está dirigida a:
- Desarrolladores de sistemas que necesitan integrar sus aplicaciones con ContaPyme.
- Gerentes, contadores y administradores de empresas que requieren la integración de sistemas y necesitan comprender el funcionamiento de la API.
- Empresas que ya tienen un software y desean complementarlo con las funcionalidades de ContaPyme.

### ¿Dónde puedo encontrar la documentación de la API de ContaPyme?
#### Respuesta
La documentación de la API está disponible en las siguientes páginas web:
- www.contapyme.com/info-medio-API
- www.contapyme.com/API

### ¿Qué tipo de información puedo integrar a través de la API?
#### Respuesta
A través de la API, puedes integrar información de:
- Clientes, empleados y vendedores.
- Productos y servicios.
- Registros y asientos contables.
- Facturas de venta (incluyendo facturación electrónica).
- Recibos de caja y abonos de cartera.
- Pedidos y cotizaciones.

### ¿Cuáles son los formatos de entrada y respuesta de la API?
#### Respuesta
Los parámetros de entrada y respuesta a las peticiones de la API están en formato JSON, y la API es de tipo REST.

### ¿Qué debo hacer para empezar a usar la API de ContaPyme?
#### Respuesta
Los pasos para empezar a usar la API son:
1. Solicitar a TeamSoft una charla técnica y comercial para analizar la viabilidad de la integración.
2. Adquirir el licenciamiento de ContaPyme y de la API.
3. Diligenciar un acuerdo de uso del módulo de API una vez se compre el licenciamiento correspondiente.
4. Iniciar el desarrollo, para lo cual se le entrega una licencia al desarrollador de sistemas tanto de ContaPyme como de la API.

### ¿Qué es el "Get out" y para qué sirve?
#### Respuesta
"Get out" es la primera función que se debe consumir para establecer una comunicación con el agente de servicios web. Esta función loguea al usuario en el agente y retorna un código único de inicio de sesión, denominado "key agente", que se utiliza en las siguientes funciones.

### ¿Cuáles son los parámetros de la función "Get out"?
#### Respuesta
La función "Get out" tiene cuatro parámetros:
1. **data JSON:** Un JSON que contiene el email (correo electrónico del usuario registrado en ContaPyme) y el password (contraseña encriptada en formato MD5).
2. **control key:** Se envía vacío en esta función, ya que la función retorna el "key agente".
3. **APP:** Un código que identifica la aplicación dentro de la interacción con el agente (del 1001 en adelante).
4. **random:** Una cadena aleatoria opcional para evitar que Internet Explorer retorne información cacheada.

### ¿Dónde se instala el agente de servicios web?
#### Respuesta
El agente de servicios web se instala en el equipo servidor de la empresa de forma local. Se debe configurar una dirección IP fija y pública, así como los puertos para su funcionamiento.

### ¿Cómo puedo crear un tercero (cliente, proveedor, etc.) utilizando la API?
#### Respuesta
Para crear un tercero, se utiliza la función "Do crear tercero". Esta función registra la información del tercero en la base de datos de ContaPyme.

### ¿Cuáles son los parámetros de la función "Do crear tercero"?
#### Respuesta
La función "Do crear tercero" tiene cuatro parámetros:
1. **data JSON:** Un JSON que contiene toda la información del tercero, organizada por secciones (info básico, tipo tercero, lista de direcciones, lista de contactos, etc.). La documentación para cada sección está disponible en la página de documentación de la API.
2. **control key:** El "key agente" obtenido a través de la función "Get out".
3. **APP:** El código de la aplicación.
4. **random:** La cadena aleatoria opcional.

### ¿Qué es el "init" en la función "Do crear tercero"?
#### Respuesta
El "init" es el identificador del tercero, y es un campo obligatorio en la función "Do crear tercero".

### ¿Cómo puedo saber qué campos son obligatorios al crear un tercero?
#### Respuesta
Dentro de ContaPyme, los campos que están en un fondo blanco son campos obligatorios. La documentación de la API también indica qué campos son requeridos.

### ¿Qué función debo usar para registrar operaciones como facturas de venta o pedidos?
#### Respuesta
Para registrar operaciones se utiliza la función maestra "do execute opera action". Esta función permite ejecutar cualquier acción sobre cualquier tipo de operación dentro de ContaPyme.

### ¿Cuáles son los parámetros de la función "do execute opera action"?
#### Respuesta
La función "do execute opera action" tiene cuatro parámetros:
1. **data JSON:** Un JSON que contiene la acción a realizar (crear, eliminar, anular, procesar, desprocesar), el tipo de operación (ITD oper), y la información específica de la operación (oper data).
2. **control key:** El "key agente".
3. **APP:** El código de la aplicación.
4. **random:** La cadena aleatoria opcional.

### ¿Qué es el "ITD oper"?
#### Respuesta
El "ITD oper" es el tipo de operación sobre la cual se va a ejecutar la acción. Cada tipo de operación (cotización, pedido, factura de venta, etc.) tiene un identificador único. Por ejemplo, para un movimiento contable es "Mob 1", para una cotización es "Ord 4", para un pedido es "ORD 1" y para una factura de venta es "ING 1".

### ¿Qué es el "oper data"?
#### Respuesta
El "oper data" contiene toda la información de la operación que se va a enviar. La estructura de este campo varía según el tipo de operación (factura de venta, cotización, pedido, etc.). Se recomienda obtener ejemplos del JSON de la operación desde el sistema ContaPyme (si se tiene la licencia de API instalada) o consultando la documentación de apoyo para cada módulo.

### ¿Cómo puedo obtener un ejemplo del JSON de una operación directamente desde ContaPyme?
#### Respuesta
Si tienes la licencia de API instalada, puedes entrar a una operación (por ejemplo, una factura de venta), completar los datos como en un ejemplo real, y luego seleccionar la opción "Desarrollador, obtener el Jason". Esto te mostrará el JSON que se construyó con los datos que ingresaste.

### ¿Dónde puedo encontrar el ITD Oper para cada operación?
#### Respuesta
Puedes encontrar el ITD Oper en la documentación de apoyo para cada módulo. Ingresa a la documentación de la API, luego "Documentación por módulos" y selecciona el módulo correspondiente (por ejemplo, Inventarios Plus para cotizaciones y pedidos, o Inventarios para facturas de venta). Dentro de la documentación de operaciones, encontrarás el ITD Oper específico para cada tipo de operación.

### ¿Qué acciones puedo realizar sobre una operación a través de la API?
#### Respuesta
A través de la función "do execute opera action", puedes realizar las siguientes acciones:
- **new:** Crea un nuevo registro para una operación y retorna un "inum oper".
- **save:** Guarda la información en una operación existente, requiriendo el "inum oper".
- **create:** Crea y guarda una operación en un solo paso, retornando el "inum oper".
- **process:** Procesa una operación para que afecte la contabilidad, inventarios, etc.
- **deprocess:** Desprocesa una operación para que no afecte la contabilidad, inventarios, etc.
- **anular:** Anula una operación, dejándola registrada pero sin afectar los estados financieros.
- **eliminar:** Elimina una operación de la base de datos.

### ¿Qué es el "inum oper"?
#### Respuesta
El "inum oper" es un identificador único de la operación. Se obtiene al crear una nueva operación con la acción "new" o "create". Este identificador se utiliza para referenciar la operación en acciones posteriores, como "save", "process", "deprocess", "anular" o "eliminar".

### ¿Cuándo debo usar la acción "calcular impuestos"?
#### Respuesta
La acción "calcular impuestos" solo aplica para operaciones de venta (facturas de venta). Esta acción calcula los impuestos correspondientes a la factura, basándose en el tercero, el régimen, y otros factores relevantes. El resultado de esta acción se utiliza para completar el JSON de la operación antes de crearla y procesarla.

### ¿Qué funciones puedo usar para consultar información de inventario, como existencias de productos?
#### Respuesta
Dentro del módulo de inventario, puedes usar la función "Get saldo físico producto en bodega". Esta función retorna el saldo físico de un producto en una o varias bodegas.

### ¿Cuáles son los tipos de licenciamiento de la API de ContaPyme?
#### Respuesta
Existen dos opciones de licenciamiento:
- **API para Cliente Desarrollador:** Para empresas que requieren integrar una funcionalidad para uso interno, sin fines comerciales de masificación.
- **API para Aliado Desarrollador:** Para empresas que poseen un sistema y desean complementarlo con funcionalidades de ContaPyme para ofrecerlo a sus clientes.

### ¿Qué es el acuerdo de uso del módulo API y dónde lo encuentro?
#### Respuesta
Es un documento que se debe diligenciar una vez que se adquiere la API. Está disponible en la página web de Contapyme. En este acuerdo se establecen el objeto, definiciones, alcance y responsabilidades de Insoft (proveedor de ContaPyme) y del desarrollador (cliente o aliado).

### ¿Quién es responsable del desarrollo para la integración con la API?
#### Respuesta
La responsabilidad del desarrollo para que la integración funcione es de la empresa que adquiere la API (cliente desarrollador o aliado desarrollador). Se debe contratar los servicios de una persona con conocimientos de programación para realizar la integración. Insoft proporciona la API, las funciones y la documentación, pero no se responsabiliza por el desarrollo específico.

---

# Recuperación de copias de seguridad
[Ver el video](https://www.youtube.com/watch?v=Xu6SlMfo_qA)
Recuperación de copias de seguridad

## Tema principal
Cómo restaurar copias de seguridad en ContaPyme.

## Resumen general
Este video explica cómo recuperar copias de seguridad en ContaPyme, tanto en formato .FBK (nativo) como en formato .ZIP (comprimido). Se explica la diferencia entre los tipos de copias, la importancia de usar copias .ZIP y el proceso paso a paso para restaurar una copia de seguridad desde el explorador de copias en el sistema. También advierte sobre la sobrescritura de datos al restaurar una copia.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipos de copias de seguridad se pueden recuperar en ContaPyme?
#### Respuesta
En ContaPyme se pueden recuperar dos tipos de copias de seguridad:
*   **Copias en formato .FBK:** Es la extensión nativa de ContaPyme, un archivo más liviano.
*   **Copias en formato .ZIP:** Es una carpeta comprimida que contiene varios archivos, incluyendo la base de datos y un archivo .FBK, ofreciendo mayor seguridad en caso de que un archivo se dañe.

### ¿Cuál es la diferencia entre una copia de seguridad .FBK y una .ZIP en ContaPyme?
#### Respuesta
*   **.FBK:** Es la extensión nativa de ContaPyme, es un único archivo y es más liviano.
*   **.ZIP:** Es una carpeta comprimida que contiene varios archivos, incluyendo la base de datos y un archivo .FBK. Se recomienda usar copias .ZIP porque ofrecen mayor seguridad, ya que si un archivo se daña, se puede recuperar el otro.

### ¿Cuál formato de copia de seguridad es más recomendado usar en ContaPyme y por qué?
#### Respuesta
Es muy recomendado hacer copias en formato **.ZIP**. Esto se debe a que este formato contiene varios archivos, incluyendo la base de datos y un archivo .FBK, lo que ofrece mayor seguridad. Si un archivo dentro del .ZIP se daña, se puede recuperar el otro.

### ¿Dónde se encuentra la opción para recuperar copias de seguridad en ContaPyme?
#### Respuesta
Para acceder a la opción de recuperación de copias de seguridad, sigue estos pasos:

1.  En ContaPyme, sin importar la pestaña en la que te encuentres, haz clic en el **botón de aplicación** ubicado en la parte superior izquierda.
2.  Selecciona la opción **Servidor**. (Este paso debe realizarse en el equipo principal).
3.  Dentro de Servidor, elige **Explorador de copias de seguridad**.
4.  En el Explorador de copias de seguridad, encontrarás el botón **Recuperar**.

### ¿Cuáles son los pasos para recuperar una copia de seguridad en ContaPyme?
#### Respuesta
Para recuperar una copia de seguridad en ContaPyme, sigue estos pasos:

1.  Dirígete al **Explorador de copias de seguridad** (Botón de aplicación -> Servidor -> Explorador de copias de seguridad).
2.  Haz clic en el botón **Recuperar**.
3.  Confirma que estás seguro de recuperar la copia dando clic en **Sí**.
4.  Busca la copia de seguridad en la ubicación donde la tienes guardada.
5.  Selecciona el tipo de copia que vas a recuperar (**Copia de seguridad ZIP** o **Copia de seguridad FBK**).
6.  Selecciona el archivo de copia de seguridad y haz clic en **Abrir**.
7.  Espera a que el sistema complete el proceso de recuperación.
8.  Haz clic en **Aceptar** en el mensaje de confirmación.
9.  Ingresa tus credenciales (usuario y contraseña) y haz clic en **Conectar** para acceder al sistema con la copia de seguridad restaurada.
10. Una vez finalizado el proceso de actualización, haz clic en **Cerrar**.

### ¿Qué sucede con la información actual en ContaPyme al recuperar una copia de seguridad?
#### Respuesta
Al recuperar una copia de seguridad, la información contenida en la copia **sobrescribe** la información que ya existe en ContaPyme. Es decir, se reemplaza la información actual por la que está contenida en la copia de seguridad que se está restaurando.

### ¿Qué mensaje se muestra al finalizar la recuperación de la copia de seguridad en ContaPyme?
#### Respuesta
Al finalizar el proceso de recuperación de la copia de seguridad, el sistema muestra un mensaje informativo que indica que "la copia de seguridad del área de trabajo uno fue restaurada satisfactoriamente".

---

# Registro de licencias
[Ver el video](https://www.youtube.com/watch?v=ef7pDxBvtyQ)
Registro de licencias en ContaPyme

## Tema principal
Registrar y activar licencias adquiridas en ContaPyme para su uso por diferentes usuarios.

## Resumen general
Este video explica cómo registrar las licencias de ContaPyme para que estén activas y disponibles para los usuarios. Se muestra dónde encontrar las licencias adquiridas (correo electrónico y portal de clientes), cómo agregarlas al catálogo de licencias, cómo activarlas y desactivarlas, y cómo solucionar el problema de la falta de correo electrónico del usuario administrador durante la activación. El video también cubre las opciones de activación automática y manual.

## Preguntas Frecuentes (FAQ)

### ¿Dónde puedo encontrar las licencias que he adquirido para ContaPyme?
#### Respuesta
Hay dos formas principales de encontrar tus licencias de ContaPyme:

1.  **Correo electrónico:** Insoft envía la factura con las licencias adjuntas al correo electrónico registrado. Puedes acceder al documento haciendo clic en "ver documento" en el correo.
2.  **Portal de clientes:** Dentro del portal de clientes de Insoft, en la sección "Mis licencias", encontrarás una lista de todas las licencias adquiridas.

### ¿Cómo registro una nueva licencia en ContaPyme?
#### Respuesta
Para registrar una nueva licencia en ContaPyme, sigue estos pasos:

1.  Dirígete al **botón de aplicación** (parte superior izquierda).
2.  Selecciona **Servidor**.
3.  Haz clic en **Catálogo de licencias**.
4.  En el catálogo de licencias, haz clic en el botón para **agregar un nuevo renglón**.
5.  **Pega** la licencia copiada del correo o del portal de clientes en el nuevo renglón (click derecho -> pegar, o Ctrl + V). La licencia aparecerá como desactivada.

### ¿Cómo activo una licencia registrada en ContaPyme?
#### Respuesta
Para activar una licencia en ContaPyme, sigue estos pasos:

1.  Dirígete al **botón de aplicación** (parte superior izquierda).
2.  Selecciona **Servidor**.
3.  Haz clic en **Catálogo de licencias**.
4.  **Ubícate** sobre la licencia que deseas activar.
5.  Haz clic en el botón **Activar licencia**.
6.  Si el usuario administrador no tiene un correo electrónico registrado, se abrirá una ventana para que lo ingreses. Ingresa el nombre, apellido y correo electrónico del usuario administrador, luego da clic en **Aceptar**.
7.  En la ventana de validación de activación de licencia, selecciona **Realizar solicitud automática** (si tienes conexión a Internet).
8.  Si la activación es exitosa, verás un mensaje de confirmación. La licencia aparecerá como "activada" en el catálogo.

### ¿Qué debo hacer si al activar la licencia me indica que el usuario "admin" no tiene correo electrónico definido?
#### Respuesta
Cuando activas una licencia por primera vez, ContaPyme puede solicitarte que ingreses el correo electrónico del usuario administrador ("admin"). Esto es necesario para la validación de la licencia. Si aparece esta solicitud, sigue estos pasos:

1.  Haz clic en **Sí** cuando te pregunte si deseas ingresar los datos requeridos.
2.  Ingresa el **nombre**, **apellido** y, especialmente, el **correo electrónico** del usuario administrador.
3.  Haz clic en **Aceptar**.
4.  Continúa con el proceso de activación de la licencia.

### ¿Cuáles son las opciones para activar una licencia y cuál es la recomendada?
#### Respuesta
Existen dos opciones para activar una licencia:

1.  **Solicitud automática:** Esta opción requiere conexión a Internet. ContaPyme se comunica directamente con el servidor de Insoft para validar la licencia. Se recomienda esta opción porque es la más rápida y sencilla.
2.  **Solicitud manual:** Esta opción requiere que llames a Insoft para solicitar un código de activación. No se recomienda a menos que no tengas conexión a Internet.

### ¿Qué significa el color verde en la vigencia de la licencia?
#### Respuesta
Si la licencia es permanente, la vigencia se mostrará en color verde. Esto indica que la licencia está activa y no tiene fecha de vencimiento. Si la licencia es en renta, en lugar del color verde, se mostrará la fecha de vencimiento.

### ¿Cómo desactivo una licencia en ContaPyme?
#### Respuesta
Para desactivar una licencia en ContaPyme, sigue estos pasos:

1.  Dirígete al **botón de aplicación** (parte superior izquierda).
2.  Selecciona **Servidor**.
3.  Haz clic en **Catálogo de licencias**.
4.  **Ubícate** sobre la licencia que deseas desactivar.
5.  Haz clic en el botón **Desactivar licencia**.
6.  En la ventana de validación de desactivación, selecciona **Realizar solicitud automática** (si tienes conexión a Internet).
7.  Si la desactivación es exitosa, verás un mensaje de confirmación. La licencia aparecerá como "desactivada" en el catálogo.

### ¿Por qué debería desactivar una licencia antes de formatear mi equipo o trasladar la licencia a otro computador?
#### Respuesta
Es necesario desactivar la licencia en ContaPyme antes de formatear el equipo o trasladarla a otro computador para evitar problemas al reactivarla. Al desactivarla, se libera la licencia del equipo actual y permite que se active en otro equipo o después de reinstalar ContaPyme. Si no se desactiva la licencia antes, puede haber conflictos durante la reactivación.

### ¿Qué debo hacer después de registrar y activar mis licencias en ContaPyme?
#### Respuesta
Una vez que hayas registrado y activado tus licencias en ContaPyme, el siguiente paso es crear usuarios y asignarles las licencias correspondientes. Esto permite que cada usuario pueda acceder a las funcionalidades del programa según la licencia que le haya sido asignada.

---

# Reglas de entrada y salida para firewall y antivirus
[Ver el video](https://www.youtube.com/watch?v=l5xkAx2gjPQ)
[l5xkAx2gjPQ]

## Tema principal
Configuración de firewall y antivirus para evitar bloqueos de ContaPyme.

## Resumen general
Este video explica cómo configurar el firewall de Windows y el antivirus Windows Defender para permitir el correcto funcionamiento de ContaPyme. Se detalla qué son las reglas de entrada y salida del firewall y cómo crear excepciones tanto para el firewall como para el antivirus, permitiendo que ContaPyme se conecte sin problemas y evitando falsas alarmas de seguridad. Se cubren los pasos necesarios para agregar ContaPyme a la lista de aplicaciones permitidas y excluir las carpetas de instalación de ContaPyme del análisis antivirus.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un firewall o cortafuegos?
#### Respuesta
Un firewall o cortafuegos es un sistema que previene y protege una red de intrusiones o ataques de otras redes, bloqueándoles el acceso. Protege las computadoras de sitios web con malware o de puertos vulnerables, deteniendo posibles atacantes. Pueden ser de hardware (como un router) o de software (como el firewall de Windows).

### ¿Qué son las reglas de entrada y de salida en el firewall?
#### Respuesta
- **Reglas de entrada:** Controlan el tráfico que se permite o bloquea desde fuentes externas, es decir, las conexiones que se generan en internet y que llegan a tu ordenador.
- **Reglas de salida:** Controlan las conexiones que se generan en tu ordenador y que salen hacia internet.

### ¿Qué es un antivirus?
#### Respuesta
Un antivirus es un software que se utiliza para evitar, buscar, detectar y eliminar virus de un computador. Normalmente, se ejecuta en segundo plano y brinda protección en tiempo real contra cualquier ataque de virus.

### ¿Por qué es importante configurar el firewall y el antivirus al instalar ContaPyme?
#### Respuesta
Al instalar ContaPyme, a veces se presentan problemas de conexión, especialmente entre el ContaPyme principal y el adicional, o al intentar actualizar el sistema. Esto se debe a que el firewall o el antivirus pueden bloquear la aplicación. Configurar excepciones permite que ContaPyme funcione sin ser bloqueado.

### ¿Cómo permito una aplicación a través del firewall de Windows?
#### Respuesta
Sigue estos pasos:
1.  Da clic en el botón de inicio y busca **Firewall**.
2.  Selecciona **Firewall de Windows**.
3.  En la ventana principal, haz clic en "Permitir una aplicación o una característica a través de firewall" en la parte izquierda.
4.  Haz clic en "Cambiar la configuración".
5.  Si ContaPyme no está en la lista, haz clic en "Permitir otra aplicación".
6.  Da clic en "Examinar".
7.  Ve a la siguiente ruta: **Este equipo > Disco local C > Archivos de programa x86 > Insoft > ContaPyme Cliente**.
8.  Selecciona **isContaPyme.exe** (verificando que el tipo diga "Aplicación") y haz clic en "Abrir".
9.  Selecciona los tipos de red (privada o pública) en los que deseas permitir la aplicación.
10. Da clic en "Agregar" y luego en "Aceptar".

### ¿Es recomendable desactivar el firewall de Windows?
#### Respuesta
No, no es recomendable desactivar el firewall de Windows, ya que dejaría el computador desprotegido y vulnerable a ataques a través de puertos abiertos.

### ¿Cómo creo una regla de entrada en el firewall de Windows para ContaPyme (para el equipo principal)?
#### Respuesta
Sigue estos pasos:
1.  Da clic en el botón de inicio y busca **Firewall**.
2.  Selecciona **Firewall de Windows**.
3.  En la parte izquierda, haz clic en "Configuración avanzada".
4.  Selecciona "Reglas de entrada" en el panel izquierdo.
5.  En el panel derecho, haz clic en "Nueva regla".
6.  Selecciona "Programa" y haz clic en "Siguiente".
7.  Haz clic en "Examinar" y ve a la siguiente ruta: **Este equipo > Disco local C > Archivos de programa x86 > Insoft > ContaPyme Cliente**.
8.  Selecciona **isContaPyme.exe** y haz clic en "Abrir".
9.  Haz clic en "Siguiente".
10. Selecciona "Permitir la conexión" y haz clic en "Siguiente".
11. Selecciona los perfiles de red a los que se aplica la regla (Privado, Público, Dominio) y haz clic en "Siguiente".
12. Asigna un nombre a la regla (ej. "ContaPyme") y haz clic en "Finalizar".

### ¿Cómo creo una regla de entrada en el firewall de Windows para permitir el puerto 3050 (para el equipo principal)?
#### Respuesta
Sigue estos pasos:
1.  Da clic en el botón de inicio y busca **Firewall**.
2.  Selecciona **Firewall de Windows**.
3.  En la parte izquierda, haz clic en "Configuración avanzada".
4.  Selecciona "Reglas de entrada" en el panel izquierdo.
5.  En el panel derecho, haz clic en "Nueva regla".
6.  Selecciona "Puerto" y haz clic en "Siguiente".
7.  Deja seleccionada la opción TCP y selecciona "Puertos locales específicos".
8.  Escribe "3050" y haz clic en "Siguiente".
9.  Selecciona "Permitir la conexión" y haz clic en "Siguiente".
10. Selecciona los perfiles de red a los que se aplica la regla (Privado, Público, Dominio) y haz clic en "Siguiente".
11. Asigna un nombre a la regla (ej. "ContaPyme 2") y haz clic en "Finalizar".

### ¿Cómo creo una regla de salida en el firewall de Windows (para los equipos adicionales)?
#### Respuesta
El proceso es similar a crear una regla de entrada, pero debes seleccionar "Reglas de salida" en el panel izquierdo de la Configuración avanzada del Firewall de Windows, en lugar de "Reglas de entrada". Los demás pasos son iguales, eligiendo ya sea el programa o el puerto.

### ¿Cómo agrego exclusiones en Windows Defender (o cualquier antivirus)?
#### Respuesta
Sigue estos pasos:
1.  Da clic en el botón de inicio y busca **Seguridad de Windows**.
2.  Selecciona **Seguridad de Windows**.
3.  Haz clic en "Protección antivirus y contra amenazas".
4.  En "Configuración de antivirus y protección contra amenazas", haz clic en "Administrar la configuración".
5.  Ve hasta el final y haz clic en "Agregar o quitar exclusiones".
6.  Da clic en "Agregar una exclusión" y selecciona "Carpeta".
7.  Ve a la siguiente ruta: **Este equipo > Disco local C > Archivos de programa x86** y selecciona la carpeta **Insoft**, luego da clic en "Seleccionar carpeta".
8.  Repite los pasos 6 y 7, pero esta vez ve a la siguiente ruta: **Este equipo > Disco local C** y selecciona la carpeta **ProgramData**, luego Insoft y da clic en "Seleccionar carpeta".

### ¿Dónde debo realizar estas configuraciones de firewall y antivirus?
#### Respuesta
Estas configuraciones deben realizarse tanto en el equipo principal como en los equipos adicionales que se conectan a ContaPyme. La diferencia es que en el equipo principal se crean reglas de entrada, mientras que en los equipos adicionales se crean reglas de salida. Las exclusiones del antivirus se configuran en todos los equipos.

---

# Reindex en ContaPyme
[Ver el video](https://www.youtube.com/watch?v=YCm8nyJn5SE)
Reindex en ContaPyme

## Tema principal
Realizar reindex normal y reindex detallado para reconstruir los índices de la base de datos en ContaPyme.

## Resumen general
Este video explica qué es reindex en ContaPyme, por qué es importante realizarlo y cuándo se debe realizar. El video detalla los dos tipos de reindex (normal y detallado) y muestra paso a paso cómo realizar un reindex detallado en ContaPyme, incluyendo la importancia de hacerlo desde el equipo principal y con todos los demás usuarios fuera del sistema. También explica la utilidad de los índices en una base de datos y cómo la reindexación puede mejorar el rendimiento del sistema.

## Preguntas Frecuentes (FAQ)

### ¿Qué es reindex en ContaPyme?
#### Respuesta
Reindex es un proceso que reconstruye los índices de cada una de las tablas que componen el sistema de la base de datos de ContaPyme.

### ¿Qué son los índices en una base de datos?
#### Respuesta
Los índices son una forma ordenada de encontrar información específica dentro de las tablas de la base de datos, similar al índice de un libro que permite encontrar un tema rápidamente sin tener que revisar página por página.

### ¿Para qué sirve realizar un reindex en ContaPyme?
#### Respuesta
Realizar un reindex sirve para:
- Reconstruir los índices de la base de datos.
- Mejorar el desempeño de los informes y consultas en ContaPyme.

### ¿Cuáles son las dos formas de realizar reindex en ContaPyme?
#### Respuesta
Las dos formas de realizar reindex en ContaPyme son:
- **Reindex normal:** Es un proceso rápido de reconstrucción de índices.
- **Reindex detallado:** Requiere que todos los usuarios estén fuera del sistema y realiza una copia de seguridad y recuperación para eliminar "basura" de la base de datos además de reconstruir los índices.

### ¿Cuándo se debe realizar un reindex en ContaPyme?
#### Respuesta
Se debe realizar un reindex en los siguientes casos:
- Si aparecen errores en algún catálogo (por ejemplo, terceros o plan de cuentas).
- Si se muestra un mensaje con alguna novedad sobre tablas del sistema.
- Si se presenta algún daño en la base de datos.
- Si el desempeño de los informes y consultas es lento o genera errores.

### ¿Cuál es la recomendación sobre qué tipo de reindex realizar?
#### Respuesta
Se recomienda realizar siempre un reindex detallado, ya que este proceso, además de reconstruir los índices, elimina datos innecesarios de la base de datos.

### ¿Qué requisito indispensable debe cumplirse para realizar un reindex detallado?
#### Respuesta
Para realizar un reindex detallado, todos los usuarios deben estar fuera del sistema ContaPyme, excepto el usuario principal en el equipo principal.

### ¿Desde qué equipo se debe realizar el proceso de reindex en ContaPyme?
#### Respuesta
El proceso de reindex se debe realizar desde el equipo principal que tiene instalado ContaPyme principal. Los equipos adicionales no tienen esta opción.

### ¿Cómo se realiza un reindex detallado en ContaPyme?
#### Respuesta
Para realizar un reindex detallado en ContaPyme, siga estos pasos:
1.  Asegúrese de que todos los usuarios estén fuera del sistema.
2.  Vaya al **botón de aplicación** (esquina superior izquierda).
3.  Seleccione **Servidor**.
4.  Seleccione **Reindex**.
5.  En la ventana de reindexación, active la opción **Realizar indexación detallada**.
6.  Haga clic en el botón **Reindexar**.
7.  Espere a que el sistema complete los 14 procesos, incluyendo la copia de seguridad y la recuperación.
8.  Cuando aparezca el mensaje "Proceso finalizado satisfactoriamente", haga clic en **Cerrar**.

---

# Requerimientos técnicos para la instalación del sistema
[Ver el video](https://www.youtube.com/watch?v=L7zou1-cCK4)

## Tema principal
Requisitos de hardware y software para un rendimiento óptimo de ContaPyme.

## Resumen general
Este video explica los requerimientos mínimos de hardware y software necesarios para un funcionamiento óptimo de ContaPyme, diferenciando entre ContaPyme principal y ContaPyme adicional. Aclara conceptos básicos como sistema operativo, procesador, memoria RAM, disco duro y latencia, y cómo estos elementos impactan el rendimiento del sistema. Además, presenta ejemplos prácticos para evaluar si un equipo cumple con los requisitos necesarios según la cantidad de usuarios y el tipo de conexión (local, red o escritorio remoto).

## Preguntas Frecuentes (FAQ)

### ¿Qué es el sistema operativo y cuál es su función en un computador?
#### Respuesta
El sistema operativo es un conjunto de programas diseñados para gestionar los recursos de un computador, como la memoria, el disco duro y el procesador. Permite la interacción entre el usuario y el computador.

### ¿Qué es el procesador o CPU y por qué es importante?
#### Respuesta
El procesador o CPU es el componente más importante del computador, actuando como el "cerebro" del sistema. Interpreta las instrucciones y procesa los datos de todos los programas.

### ¿Qué es la memoria RAM y cómo se diferencia del disco duro?
#### Respuesta
La memoria RAM es la memoria principal donde se almacenan temporalmente los datos de los programas. Al reiniciar o apagar el computador, estos datos se borran. A diferencia, el disco duro almacena información digital de forma permanente.

### ¿Qué es la latencia y en qué unidades se mide?
#### Respuesta
La latencia es el tiempo que transcurre desde que se realiza una solicitud vía Internet hasta que se recibe la respuesta. Se mide en milisegundos.

### ¿Cuál es la diferencia entre ContaPyme principal y ContaPyme adicional?
#### Respuesta
- **ContaPyme principal:**  Alberga el sistema, el motor de base de datos y la base de datos. Recibe solicitudes y envía respuestas. Requiere mejores características de hardware.
- **ContaPyme adicional:** Es un acceso directo que se conecta al ContaPyme principal para hacer solicitudes y recibir respuestas. Requiere menos recursos de hardware.

### ¿Es posible tener ContaPyme principal y utilizarlo localmente?
#### Respuesta
Sí, se puede tener un ContaPyme principal donde se trabaja localmente. También se puede tener un equipo principal que solo funciona como servidor, sin uso local, al que los usuarios se conectan remotamente. A esto último se le conoce como un equipo dedicado.

### ¿Qué sistema operativo se recomienda para ContaPyme principal?
#### Respuesta
Se recomienda cualquier versión de Windows, ya sea Windows Server o versiones estándar como Windows 7, 10 u 11.

### ¿Qué sistema operativo se recomienda para ContaPyme adicional?
#### Respuesta
Se recomienda Windows 7 o versiones posteriores como Windows 8, 10 u 11. Aunque ContaPyme es compatible con versiones anteriores como Windows XP, no es recomendado por la falta de soporte técnico de Windows para esos sistemas.

### ¿Cuánto de procesador (CPU) se necesita para ContaPyme principal?
#### Respuesta
Se necesitan 4 GHz más 1 GHz adicional si se va a trabajar localmente en ContaPyme. Si el equipo principal es un servidor dedicado y no se utiliza localmente, solo se necesitan los 4 GHz.

### ¿Cuánto de procesador (CPU) se necesita para ContaPyme adicional?
#### Respuesta
Se necesitan 2 GHz para el sistema operativo más 1 GHz para ContaPyme. Es decir, un total de 3 GHz si se va a trabajar en ContaPyme desde el equipo adicional.  Si se utilizan otros programas, se debe considerar el consumo de procesador de esos programas y sumarlo a los requerimientos.

### ¿Cuánta memoria RAM se necesita para el sistema operativo en ContaPyme principal?
#### Respuesta
Se necesitan mínimo 4 GB de RAM para el sistema operativo.

### ¿Cuánta memoria RAM se necesita para el sistema operativo en ContaPyme adicional?
#### Respuesta
Se necesitan 3 GB de RAM.

### ¿Cuánta memoria RAM se necesita para Firebird en ContaPyme principal?
#### Respuesta
Se necesitan 2 GB de RAM para Firebird, que es el motor de base de datos.

### ¿Se necesita memoria RAM para Firebird en ContaPyme adicional?
#### Respuesta
No, ContaPyme adicional no requiere memoria RAM adicional para Firebird porque no tiene instalado el motor de base de datos.

### ¿Cuánta memoria RAM se necesita por cada usuario de ContaPyme?
#### Respuesta
Se necesita 1 GB de RAM por cada usuario de ContaPyme. Si el ContaPyme principal se usa localmente, se necesita 1 GB adicional.

### ¿Cuánto espacio de disco duro se necesita para ContaPyme principal?
#### Respuesta
Se necesitan mínimo 50 GB disponibles.

### ¿Cuánto espacio de disco duro se necesita para ContaPyme adicional?
#### Respuesta
Se necesitan mínimo 50 GB disponibles.

### ¿Qué tipo de disco duro es recomendable para la base de datos en ContaPyme principal?
#### Respuesta
Se recomienda un disco duro sólido (SSD) con al menos 20 GB disponibles para la base de datos. Si solo se tiene un disco duro mecánico (HDD), se recomienda tener al menos 500 GB disponibles.

### ¿Qué resolución de monitor se recomienda para ContaPyme?
#### Respuesta
Se recomienda una resolución HD de al menos 1280x720.

### ¿Qué tipo de tarjeta de red se recomienda para ContaPyme?
#### Respuesta
Se recomienda una tarjeta de red de 1 Gigabit tanto para ContaPyme principal como para ContaPyme adicional.

### ¿Qué velocidad de conexión a Internet se recomienda para ContaPyme principal?
#### Respuesta
Se recomiendan 50 megabits de bajada y 5 megabits de subida.

### ¿Qué velocidad de conexión a Internet se recomienda para ContaPyme adicional?
#### Respuesta
Se recomiendan 30 megabits de bajada y 3 megabits de subida.

### ¿Qué se debe verificar al contratar un servicio de Internet?
#### Respuesta
Se debe verificar que la velocidad de subida garantizada por el proveedor sea al menos el 10% de la velocidad de bajada contratada.

### ¿Qué es un Active Directory y por qué no se recomienda configurarlo?
#### Respuesta
Active Directory es un servicio de directorio utilizado en sistemas operativos Windows Server. No se recomienda configurarlo porque puede ocasionar inconvenientes.

### ¿Cuándo se recomienda usar un servidor de terminales (conexión por escritorio remoto)?
#### Respuesta
Se recomienda cuando se van a conectar muchos usuarios a un mismo equipo, ya que todos consumirán los recursos de ese equipo.

### ¿Qué dos escenarios existen para el uso de terminales?
#### Respuesta
1.  **Terminales solo para ContaPyme adicional:** Se tienen dos equipos principales, uno con ContaPyme principal y la base de datos, y otro que actúa como terminal de usuarios, donde se conecta ContaPyme adicional. Los usuarios se conectan a este segundo equipo por escritorio remoto.
2.  **Terminales para ContaPyme principal y adicional:** Se tiene un solo equipo principal con ContaPyme principal, la base de datos y las licencias, al que todos los usuarios se conectan directamente por escritorio remoto.

### ¿Cuánta memoria RAM se necesita por usuario en un servidor de terminales?
#### Respuesta
Se necesita 1.5 GB de RAM por usuario, tanto en terminales para ContaPyme adicional como para ContaPyme principal y adicional.

### ¿Cómo puedo consultar las características de mi computador?
#### Respuesta
1.  **Opción 1:**
    *   Haga clic derecho en "Este equipo" en el escritorio o en el explorador de archivos.
    *   Seleccione "Propiedades".
    *   Aquí verá el sistema operativo, el procesador y la memoria RAM instalada.
2.  **Opción 2:**
    *   Haga clic derecho en la barra de tareas.
    *   Seleccione "Administrador de tareas".
    *   Vaya a la pestaña "Rendimiento".
    *   Seleccione "CPU" para ver la velocidad y los núcleos del procesador.
    *   Seleccione "Memoria" para ver la información sobre la memoria RAM.

---

# Software Contable ContaPyme - Diseñador de documentos
[Ver el video](https://www.youtube.com/watch?v=MmVYESyV_hA)
[MmVYESyV_hA]

## Tema principal
Personalización de informes y documentos de impresión en ContaPyme

## Resumen general
Este video explica cómo personalizar informes y documentos de impresión en ContaPyme. Se cubren temas como la modificación de encabezados, la adición de logos, la ocultación de columnas en informes, y el diseño de facturas preimpresas o desde cero. El video también muestra cómo trabajar con las diferentes áreas del diseñador de documentos, incluyendo el árbol del informe/documento, el área de diseño y el árbol de datos, y cómo guardar y reutilizar diseños personalizados.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a los documentos de impresión en ContaPyme?
#### Respuesta
La ruta básica para acceder a los documentos de impresión es: **Básico > Documentos de Impresión**. Allí encontrarás todos los documentos predeterminados del sistema.

### ¿Dónde puedo cambiar el nombre del documento o el encabezado en los informes?
#### Respuesta
Dentro de un informe tipo impresión, puedes modificar el nombre del documento y el encabezado accediendo al **diseñador de documentos**. Para acceder al diseñador:
1.  Genera el informe.
2.  En la cinta de opciones, haz clic en **Diseñar**.

### ¿Cómo puedo saber si un informe ha sido modificado?
#### Respuesta
Cuando ingresas al diseño de un informe, el botón "Diseñar" en la cinta de opciones mostrará:
*   **Diseño Original:** Si el informe no ha sido modificado.
*   **Diseño Personalizado:** Si se ha realizado algún cambio en el informe.

### ¿Cuáles son los componentes del diseñador de documentos?
#### Respuesta
El diseñador de documentos se compone de cinco componentes principales:
1.  **Barra de herramientas:** Contiene botones y acciones para modificar el diseño.
2.  **Árbol del informe/documento:** Muestra la estructura del informe o documento.
3.  **Área de diseño:** Donde se realizan los cambios y se editan los campos.
4.  **Árbol de datos:** Contiene todos los campos que se pueden adicionar al informe o documento.
5.  **Opción Ver > Mostrar Datos:** Muestra los datos en el diseño para facilitar la identificación de los campos.

### ¿Cómo puedo ampliar o disminuir el tamaño de un campo en el diseñador de documentos?
#### Respuesta
Hay dos formas de modificar el tamaño de un campo:
*   **Con el mouse:** Selecciona el campo y arrastra los bordes hasta el tamaño deseado.
*   **Con el teclado:**
    1.  Selecciona el campo.
    2.  Mantén presionada la tecla **Shift** y utiliza las flechas izquierda o derecha para disminuir o ampliar el campo horizontalmente, o las flechas arriba o abajo para modificarlo verticalmente.

### ¿Cómo puedo mover varios campos a la vez en el diseñador de documentos?
#### Respuesta
1.  Selecciona el primer campo.
2.  Mantén presionada la tecla **Shift** y selecciona los campos adicionales que deseas mover.
3.  Mueve los campos seleccionados con el mouse o utilizando la tecla **Control** y las flechas del teclado.

### ¿Cómo inserto el logo de mi empresa en un informe o documento de impresión?
#### Respuesta
1.  En la barra de herramientas, haz clic en el botón **Imagen** (icono a la derecha de la calculadora).
2.  Dibuja un recuadro en el área donde deseas insertar la imagen.
3.  Haz clic derecho dentro del recuadro y selecciona 'Picture' (o 'Imagen').
4.  Busca y selecciona la imagen de tu logo.
5.  Ajusta el tamaño de la imagen dentro del recuadro.

**Recomendación:** Antes de insertar la imagen, verifica su tamaño y ajústalo con un editor de imágenes como Paint para evitar distorsiones.

### ¿Cómo puedo guardar un informe personalizado para usarlo en otra área de trabajo o base de datos?
#### Respuesta
1.  Dentro del diseño del informe, ve a **Archivo > Guardar como**.
2.  Selecciona la ubicación donde deseas guardar el archivo (por ejemplo, el escritorio).
3.  Haz clic en **Guardar**.
Para abrirlo en otra área de trabajo:
1.  Genera el informe en la nueva área de trabajo.
2.  Entra al **diseño del informe**.
3.  Ve a **Archivo > Abrir**.
4.  Busca y selecciona el archivo guardado.
5.  Haz clic en **Cerrar** y luego en **Guardar los cambios**.

### ¿Cómo puedo agregar los nombres del Representante Legal, Contador y Revisor Fiscal en los informes para que aparezcan automáticamente?
#### Respuesta
Asegúrate de tener la información completa de la empresa en el **Explorador Gráfico**, en la opción **Modificar Empresa**.  Si ingresas los nombres del Representante Legal, Contador y Revisor Fiscal (o Gerente), el sistema los mostrará por defecto en los informes. Puedes cambiar las etiquetas ("Revisor Fiscal" por "Gerente") en el diseñador de documentos seleccionando la etiqueta y modificándola en la parte superior de la barra de herramientas.

### ¿Cómo cambio el tipo de letra, tamaño o color de un texto en el diseñador de documentos?
#### Respuesta
1.  Selecciona el campo de texto que deseas modificar.
2.  En la barra de herramientas, utiliza las opciones de tipo de letra, tamaño, negrilla, cursiva y color para personalizar el texto.
3.  Puedes alinear el texto a la izquierda, centrarlo, justificarlo a la derecha o justificarlo completamente.

### ¿Cómo cambio el color del título de la empresa si no se modifica en el diseñador de documentos?
#### Respuesta
Si no puedes cambiar el color del título de la empresa directamente en el diseñador de documentos, modifica la configuración en el **Explorador Gráfico**. Ve a la pestaña **Rótulo de Reportes** y cambia el color del **Título Principal**.

### ¿Cuál es la diferencia entre un documento de soporte y un documento de impresión?
#### Respuesta
*   **Documento de soporte:** Solo puede existir uno para cada tipo de operación (por ejemplo, una máscara para la factura de venta).
*   **Documento de impresión:** Puedes tener múltiples diseños para un mismo documento de soporte.

### ¿Cuál es la diferencia entre "Documento Principal" y "Documento Borrador" en los documentos de impresión?
#### Respuesta
*   **Documento Principal:** Diseñado para impresoras de alta calidad (inyección de tinta o láser).
*   **Documento Borrador:** Diseñado para impresoras matriz de punto.

### ¿Cómo configuro que la factura se imprima por defecto en calidad borrador para impresoras matriz de punto?
#### Respuesta
1.  Abre el documento de impresión de la factura.
2.  Ve a **Opciones de Impresión**.
3.  Activa la opción **Imprimir en calidad borrador**.
4.  Haz clic en **Aceptar**.

### ¿Qué es una región en el diseñador de documentos y cuáles son sus ventajas?
#### Respuesta
Una región es un recuadro que contiene uno o varios campos, subreportes o etiquetas. La principal ventaja de trabajar con regiones es que puedes mover todos los elementos dentro de la región simultáneamente.

### ¿Qué puedo tener dentro de una región?
#### Respuesta
Dentro de una región puedes tener:
*   Diferentes campos.
*   Subreportes.
*   Etiquetas (labels).

### ¿Cómo adiciono una nueva región?
#### Respuesta
1. Haz clic en el botón de **Región** (uno de los últimos iconos de la barra de herramientas).
2. Da clic en el área del diseño donde quieres ubicar la región.
Para quitar la línea de la región:
1. Selecciona la región
2. En la barra de herramientas, selecciona la opción **Sin línea**

### ¿Qué es "mover relativo a" y cómo funciona?
#### Respuesta
"Mover relativo a" es una opción que permite que una región se mueva en relación con otra región. Esto significa que si mueves la región principal, la región que tiene la opción "mover relativo a" se moverá automáticamente para mantener la relación entre ellas. Para activarlo, da clic derecho sobre la región y selecciona "Mover relativo a".

### ¿Cómo adiciono un nuevo subreporte?
#### Respuesta
Da clic en el botón de **Subreporte** (icono al lado derecho del botón de Región) y luego da clic en el área donde quieres ubicar el subreporte. Puedes adicionar subreportes dentro de una región o por fuera.

### ¿Cómo elimino un campo en el diseñador de documentos?
#### Respuesta
Selecciona el campo y presiona la tecla **Suprimir**. También puedes ocultar el campo haciendo clic derecho y desmarcando la opción **Visible**.

### ¿Cómo adiciono una etiqueta o label?
#### Respuesta
Da clic en el botón de la letra **A** (etiqueta) en la barra de herramientas y luego da clic en el área de diseño donde quieres adicionar el label. Luego escribe el texto deseado en la parte superior de la barra de herramientas.

### ¿Cómo alinear campos en el diseñador de documentos?
#### Respuesta
1.  Selecciona los campos que deseas alinear.
2.  En la barra de herramientas, utiliza las opciones de alineación (alinear a la izquierda, al centro, a la derecha, arriba, abajo o al centro vertical).

### ¿Dónde encuentro la información de la empresa (dirección, teléfono, etc.) para los documentos de impresión?
#### Respuesta
La información de la empresa (dirección, teléfono, ciudad, país, email) para los documentos de impresión se encuentra en **Datos Encabezado**.

### ¿Dónde encuentro la información relacionada con el producto en los documentos de impresión?
#### Respuesta
La información relacionada con el producto (precio, número de unidades, cantidad, valor del descuento) se encuentra en **Lista Elementos Factura**.

### ¿Dónde encuentro la información relacionada con la forma de pago en los documentos de impresión?
#### Respuesta
La información relacionada con la forma de pago se encuentra en **Lista de Forma de Cobro**.

### ¿Cómo adiciono un campo nuevo a un subreporte?
#### Respuesta
1.  Sitúate en el subreporte deseado (por ejemplo, Lista Elementos Factura).
2.  En el árbol de datos (DataTree), selecciona el campo que deseas adicionar.
3.  Arrastra el campo desde el árbol de datos hasta el área de diseño, ubicándolo en la posición deseada.

### ¿Cómo cambio el origen de un campo ya existente?
#### Respuesta
Selecciona el campo en el área de diseño. En la parte superior de la barra de herramientas, busca el campo que indica de dónde proviene la información (por ejemplo, Lista Elementos Factura) y cámbialo por el nuevo origen deseado.

---

# Unificar módulos por licencias virtuales
[Ver el video](https://www.youtube.com/watch?v=Rg2BSVqVXwQ)
Unificar módulos por licencias virtuales en Contapyme

## Tema principal
Unificación de módulos mediante licencias virtuales en ContaPyme.

## Resumen general
Este video explica cómo unificar diferentes módulos de ContaPyme utilizando licencias virtuales. Aprenderás qué es una licencia, cómo están organizadas por módulos, y cómo combinar licencias de diferentes módulos en una sola para facilitar el acceso y la gestión dentro del sistema. El video muestra un ejemplo práctico de cómo unificar los módulos de gastos y facturación.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una licencia en ContaPyme?
#### Respuesta
Una licencia es un código o permiso que se le entrega al cliente para que pueda utilizar el programa contable ContaPyme. Es un número que se ingresa en el sistema para activar el software y los módulos correspondientes.

### ¿Cómo están organizadas las licencias en ContaPyme?
#### Respuesta
Las licencias en ContaPyme están organizadas por módulos y por número de ejecuciones. Esto significa que una licencia puede activar un módulo específico del sistema, como contabilidad o cartera.

### ¿Qué significa que ContaPyme está desarrollado como un "rompecabezas"?
#### Respuesta
Significa que ContaPyme está diseñado de forma modular, donde diferentes módulos pueden unirse según las necesidades del usuario. Por ejemplo, si inicialmente tienes el módulo de contabilidad, puedes agregar posteriormente el módulo de cartera sin tener que reinstalar todo el sistema.

### ¿Cómo puedo unificar módulos usando licencias virtuales en ContaPyme?
#### Respuesta
Para unificar módulos usando licencias virtuales, sigue estos pasos:
1. Ve al botón **Aplicación** (esquina superior izquierda).
2. Selecciona **Servidor y catálogo de licencias**.
3. En el catálogo de licencias, selecciona la licencia que deseas modificar y da clic en **Paso avanzado**.
4. Identifica los módulos que deseas unificar.
5. En la licencia del módulo que deseas eliminar, cambia la opción de **Edición** a **Ninguno**.
6. En la licencia donde deseas agregar el módulo, cambia la opción a **Edición** para permitir modificaciones o **Consulta** para solo ver movimientos.
7. Haz clic en **Aceptar** para guardar los cambios.

### ¿Cuál es la diferencia entre "Edición" y "Consulta" al unificar módulos?
#### Respuesta
- **Edición:** Permite realizar modificaciones y cambios dentro del módulo unificado.
- **Consulta:** Permite únicamente consultar movimientos relacionados con ese módulo, sin poder realizar cambios.

### ¿Puedo unificar cualquier licencia en ContaPyme?
#### Respuesta
Las licencias se pueden unificar siempre y cuando sean modulares y según las necesidades del usuario.

### ¿A quién puedo asignar las licencias unificadas?
#### Respuesta
Puedes asignar las licencias unificadas al usuario que necesite acceder a esos módulos en ContaPyme.
