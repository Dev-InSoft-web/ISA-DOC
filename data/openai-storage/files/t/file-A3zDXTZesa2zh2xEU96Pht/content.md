# Instalación

## Instalación en equipo nuevo

### ¿Cómo puedo instalar ContaPyme en un nuevo computador?

**Respuesta:**  
Este procedimiento te permite instalar ContaPyme por primera vez en un equipo que funcionará como servidor principal. Antes de comenzar, verifica que el computador cumpla con los requisitos mínimos para garantizar un funcionamiento óptimo:

- **Sistema operativo:** Windows 10 o superior.  
- **Procesador:** 4 GHz o más.  
- **Memoria RAM:** 4 GB para el sistema, más 2 GB adicionales para Firebird.  
- **Almacenamiento:** HDD con 50 GB libres o SSD NVMe con al menos 20 GB.  
- **Conexión a internet:** 50 Mbps de descarga y 5 Mbps de subida.  
- **Permisos:** sesión de usuario con privilegios de administrador.

**Pasos de instalación:**
1. 📌 **Verifica el estado del equipo**  
   - Revisa que cumplas con los requerimientos mínimos para realizar la instalación 
2. 📥 **Descarga el instalador**  
   - Ingresa al **Portal de Clientes ContaPyme** (https://www.contapyme.com/portal-clientes/) con tu usuario y contraseña.  
   - En la barra izquierda, selecciona **Instaladores** y descarga la versión más reciente.
3. ▶️ **Ejecuta el instalador**  
   - Haz doble clic en el archivo descargado, acepta el acuerdo de licenciamiento y elige la carpeta de instalación (se recomienda la predeterminada).  
   - Define la carpeta donde se almacenará la base de datos (también se recomienda la predeterminada).
4. 🔹 **Selecciona el tipo de instalación**  
   - Elige **ContaPyme principal** si este equipo será el servidor.  
   - Ingresa la licencia asignada o selecciona la opción de licencia de demostración.
5. ✔ **Finaliza**  
   - Haz clic en **Finalizar** y abre el programa desde el escritorio.  
   - Al iniciar, configura la región, el PUC y la contraseña de acceso.

**También aplica si preguntas:**  
- ¿Cómo instalo ContaPyme en mi computador principal?  
- ¿Qué debo hacer para instalar ContaPyme por primera vez?  

**Recursos adicionales:**   
- [Video: Instalación de ContaPyme principal](https://www.youtube.com/watch?v=vFFkwsIhL7s&t=5s)

---

## Instalación en equipo nuevo

### ¿Cómo trasladar la instalación de ContaPyme adicional a un computador nuevo?

**Respuesta:**  
Este procedimiento te permite mover ContaPyme de un computador adicional (cliente) a otro nuevo, manteniendo la conexión con el servidor principal.

1. 📥 **Instalar ContaPyme en el nuevo computador**  
   - Descarga el instalador desde el **Portal de Clientes** (https://www.contapyme.com/portal-clientes/) ingresa con tu usuario y contraseña.  
   - En la barra izquierda, selecciona **Instaladores** y descarga la versión más reciente. 
   - Haz doble clic en el archivo descargado, acepta el acuerdo de licenciamiento, sigue los pasos. 
   - Selecciona **instalación equipo adicional**.
2. 📋 **Obtener la configuración del cliente anterior**  
   - Anota la dirección IP del servidor o el nombre de ese equipo.   
3. 🔹 **Configurar la conexión**  
   - Después de realizar la instalación, ingresa la IP o nombre del equipo servidor, en ese computador adicional, propiamente en **Servidor de datos**.
4. ✔ **Probar acceso**  
   - Abre ContaPyme y verifica que el usuario pueda conectarse.

💡 **Importante:** No necesitas mover la base de datos, ya que sigue estando en el computador principal.

**También aplica si preguntas:**  
- ¿Cómo mover ContaPyme de un cliente viejo a uno nuevo?  
- ¿Cómo reinstalar ContaPyme en otro equipo cliente sin perder conexión?  

**Recursos adicionales:**   
- [Video: Instalación de ContaPyme principal](https://www.youtube.com/watch?v=vFFkwsIhL7s)
---

## Instalación en equipos adicionales

### ¿Cómo instalar ContaPyme en computadores adicionales?

**Respuesta:**  
Este proceso permite instalar ContaPyme en equipos que funcionarán como clientes conectados a un servidor principal.

1. 📥 **Descarga el instalador**  
   - Ingresa al **Portal de Clientes ContaPyme**(https://www.contapyme.com/portal-clientes/) con tu usuario y contraseña.  
   - En la barra izquierda, selecciona **Instaladores** y descarga la versión más reciente.
2. ▶️ **Ejecuta el instalador**  
   - Haz doble clic en el archivo descargado y acepta el acuerdo de licenciamiento.
3. 🔹 **Selecciona tipo de instalación**  
   - Elige **ContaPyme adicional** si este equipo será un cliente.
4. ✔ **Finaliza instalación y prueba acceso**  
   - Inicia sesión con tu usuario y contraseña.

**También aplica si preguntas:**  
- ¿Cómo instalo ContaPyme como cliente en otro equipo?  
- ¿Qué pasos sigo para instalar ContaPyme adicional?  
- ¿Cómo puedo instalar Contapyme en el computador portátil del contador?
- ¿Cómo puedo instalar el sistema en un equipo auxiliar con una nueva licencia temporal?

**Recursos adicionales:**   
- [Video: Instalación de ContaPyme adicional](https://www.youtube.com/watch?v=vFFkwsIhL7s&t=5s)

---

## Conexión cliente-servidor

### ¿Cómo conectar un computador adicional con el computador principal para usar ContaPyme?

**Respuesta:**  
La conexión entre un equipo cliente y el servidor principal de ContaPyme puede realizarse **localmente** o **por internet**.  

**Conexión local (misma red):**
- 📌 En el servidor, confirma que ContaPyme y Firebird estén instalados y la base de datos operativa.  
- Obtén la dirección IP local del servidor:  
  1. Abre **CMD (Símbolo del sistema)**.  
  2. Escribe `ipconfig` y presiona Enter.  
  3. Identifica la **Dirección IPv4**.  
- En el cliente, en **Servidor de datos**, ingresa la IP local o el nombre del equipo principal.  
- Ingresa usuario, contraseña y área de trabajo.

**Conexión por internet (ubicaciones distintas):**
1. ⚠️ Solicita al proveedor de internet del servidor la apertura del **puerto 3050**.  
2. Verifica en [canyouseeme.org](https://canyouseeme.org):  
   - Cambia el puerto a 3050 y prueba.  
   - ✅ Debe mostrar **“satisfactorio”** en verde.  
3. Obtén la **IP pública** (diferente a la IP local).  
4. En el cliente, en **Servidor de datos** ingresa la IP pública del servidor y los datos de acceso.

**Notas importantes:**  
⚠️ Requiere conexión estable y rápida.  
⚠️ La apertura del puerto solo puede realizarla el proveedor.  

**También aplica si preguntas:**  
- ¿Cómo configuro la conexión de ContaPyme entre dos sedes?  
- ¿Cómo enlazar un cliente de ContaPyme al servidor principal? 
- ¿Cómo abrir un auxiliar o acceder a la información desde otro equipo?
- ¿Cómo instalar y conectar dos puntos de venta al servidor? 
- ¿Cómo conectar los adicionales si cambié el servidor?

**Recursos adicionales:**   
- [Video: Conexión a ContaPyme por medio de red local](https://www.youtube.com/watch?v=WTZt2Las-VM&t=3s)
- [Video: Instalación de ContaPyme principal](Conexión a ContaPyme por internet)

---

## Traslado de instalación

### ¿Cómo trasladar ContaPyme de un computador a otro sin perder la información?

**Respuesta:**  
Si necesitas mover ContaPyme a un nuevo equipo y conservar toda tu información:

1. 💾 **Guarda tu información**  
   - Copia la carpeta de base de datos (por defecto se encuentra en `C:\ProgramData\InSoft\`).  
   - También puedes generar la copia desde el sistema y guardarla en un medio externo: (Botón de aplicación → Servidor → Explorador de copias de seguridad → Nueva)
2. 🔄 **Desactiva la licencia**  
   - Botón de aplicación → Servidor → Catálogo de licencias → Desactivar licencia automáticamente.
3. 📥 **Instala ContaPyme en el nuevo equipo**  
   - Ingresa al **Portal de Clientes ContaPyme** (https://www.contapyme.com/portal-clientes/) con tu usuario y contraseña.  
   - En la barra izquierda, selecciona **Instaladores** y descarga la versión más reciente.
   - Haz doble clic en el archivo descargado, acepta el acuerdo de licenciamiento y elige la carpeta de instalación (se recomienda la predeterminada).  
   - Define la carpeta donde se almacenará la base de datos (también se recomienda la predeterminada).
   - Elige en tipo de instalación **ContaPyme principal**.  
   - Ingresa la licencia asignada.
   - Haz clic en **Finalizar** y abre el programa desde el escritorio.  
   - Al iniciar, configura la región, el PUC y la contraseña de acceso.
4. 📂 **Restaura la información**  
   - Reemplaza la carpeta **InSoft** que guardaste, en la misma ruta o usa el Explorador de copias: (Botón de aplicación → Servidor → Explorador de copias de seguridad → Recuperar). 
   - Si recuperas varias áreas, créalas antes de restaurar.
5. 🔑 **Reactiva la licencia**  
   - Botón de aplicación → Servidor → Catálogo de licencias → Activar licencia automáticamente.
6. ✔ **Valida funcionamiento**  
   - Abre ContaPyme y confirma que los datos estén intactos.

**También aplica si preguntas:**  
- ¿Cómo cambiar ContaPyme de computador sin perder datos?  
- ¿Qué pasos sigo para trasladar mi instalación de ContaPyme?  
- ¿Cómo instalar el sistema si ya tengo la información en otro equipo?
- ¿Cómo trasladar la instalación del programa de un computador a otro?
- ¿Cuál es el procedimiento para reinstalar ContaPyme?

**Recursos adicionales:**   
- [Video: Recuperación de copias de seguridad](https://www.youtube.com/watch?v=Xu6SlMfo_qA&t=150s)

---

## Usuarios adicionales y licencias

### ¿Cómo agregar un nuevo usuario en ContaPyme?

**Respuesta:**  
1. 🔑 Inicia sesión con un usuario administrador.  
2. Ve a **Básico → Usuarios → Crear**.  
3. 📌 Ingresa código, nombre, apellido, contraseña, perfil de seguridad y licencia (pestaña **Licencias** → columna **Asignar**).  
4. ✔ Da clic en **Aceptar** para guarda cambios y prueba el acceso desde otro equipo.

**También aplica si preguntas:**  
- ¿Cómo creo un usuario nuevo en ContaPyme?  
- ¿Cómo asignar permisos a un usuario?
- ¿Cómo instalar un usuario adicional o agregar un nuevo usuario al sistema?  

**Recursos adicionales:**   
- [Video: Creación de usuarios y asignación de licencias](https://www.youtube.com/watch?v=o49Sh93o3H0)

---

## Usuarios adicionales y licencias


### ¿Cómo agregar licencias adicionales en ContaPyme?

**Respuesta:**  
1. 📄 Obtén la licencia desde la factura o el **Portal de Clientes** (https://www.contapyme.com/portal-clientes/) → **Mis licencias**.  
2. En ContaPyme: Botón de aplicación → Servidor → Catálogo de licencias → **Adicionar renglón**.  
3. 📋 Pega la licencia(s).  
4. ✅ Actívala automáticamente.  
5. 🔹 Asóciala a un usuario desde esta ventana (**Avanzado → Inspector**) o desde **Básico → Usuarios → Crear/Modificar → Licencia → Asignar**.  
6. ✔ Da clic en **Aceptar** para que guardes cambios y confirma el acceso.

**También aplica si preguntas:**  
- ¿Cómo instalar una nueva licencia en ContaPyme?  
- ¿Cómo activar licencias adicionales? 
- ¿Cómo realizar la instalación de licencias adicionales de Contapyme? 

**Recursos adicionales:**   
- [Video: Registro de licencias](https://www.youtube.com/watch?v=ef7pDxBvtyQ&t=239s)

---

## Activación de licencias

### ¿Cómo activar las licencias en ContaPyme?

**Respuesta:**  
1. 🔑 Abre ContaPyme desde el equipo principal y con un usuario administrador.  
2. Botón de aplicación → **Servidor** → **Catálogo de licencias**.  
3. Selecciona la licencia a activar y clic en **Activar licencia**.  
4. El sistema validará la licencia con InSoft a través de internet.  
5. ✔ Haz clic en **Aceptar** para completar.

💡 **Si no hay internet:** puedes activar de forma manual con Insoft.

**También aplica si preguntas:**  
- ¿Qué debo hacer para activar una licencia de ContaPyme?  
- ¿Cómo validar una licencia con InSoft?  

**Recursos adicionales:**   
- [Video: Registro de licencias](https://www.youtube.com/watch?v=ef7pDxBvtyQ&t=239s)

---

## Consulta de licencias

### ¿Dónde puedo consultar mis licencias de ContaPyme?

**Respuesta:**  

**Dentro de ContaPyme:**  
- Botón de aplicación → **Servidor** → **Catálogo de licencias**.  
- Allí verás todas las licencias, con fecha de vigencia y estado.

**En el Portal de Clientes ContaPyme:**  
- Inicia sesión en (https://www.contapyme.com/portal-clientes) con tu usuario y contraseña.
- Ve a la sección **Mis licencias** para ver toda la información de las licencias. 

**También aplica si preguntas:**  
- ¿Cómo verificar las licencias registradas?  
- ¿Dónde veo el estado de mis licencias en ContaPyme?  

---

## Usuarios adicionales y licencias

### ¿Cómo instalar ContaPyme con una licencia adicional de forma independiente?

**Respuesta:**  
1. 📄 Obtén la licencia desde la factura o el **Portal de Clientes** (https://www.contapyme.com/portal-clientes/) → **Mis licencias**.  
2. 📥 Descarga el instalador más reciente desde el portal.  
3. ▶️ Ejecuta el instalador: acepta el acuerdo, elige la carpeta de instalación y la carpeta para la base de datos (recomendada la predeterminada).  
4. 🔹 Selecciona **ContaPyme principal** e ingresa la licencia adicional asignada.  
5. ✔ Finaliza, abre el programa y configura región, PUC y contraseña.

**Nota:**  
⚠️ Si el sistema detecta solo licencias adicionales y no una principal, **solo un usuario podrá trabajar a la vez**. Para múltiples conexiones simultáneas es necesaria una licencia de servidor.

**También aplica si preguntas:**  
- ¿Cómo instalar ContaPyme solo con licencias adicionales?  
- ¿Qué limitaciones tiene instalarlo sin licencia principal?  

**Recursos adicionales:**   
- [Video: Instalación de ContaPyme principal](https://www.youtube.com/watch?v=vFFkwsIhL7s)

---

## Cambio de licencia DEMO a comercial

### ¿Cómo cambiar mi licencia DEMO por una licencia comercial en ContaPyme?

**Respuesta:**  
1. Inicia ContaPyme con la licencia DEMO.  
2. Haz clic en el botón de aplicación → **Servidor** → **Catálogo de licencias**.  
3. Elimina la licencia Demo que se encuentra en el catálogo tanto de la primera ventana como de la que registra en opción **Avanzado**
4. Clic en aceptar para guardar catálogo sin licencias.
5. Nuevamente ingresar por el botón de aplicación → **Servidor** → **Catálogo de licencias**. 
6. Agrega la nueva licencia comercial 
7. ✅ Activa la nueva licencia con el botón **Activar licencia**
8. Asigna la licencia al usuario correspondiente
9. ✔ Da clic en **Aceptar** para que guardes cambios

**También aplica si preguntas:**  
- ¿Cómo pasar de licencia DEMO a comercial?  
- ¿Cómo reemplazar la licencia de prueba por la definitiva? 

**Recursos adicionales:**   
- [Video: Registro de licencias](https://www.youtube.com/watch?v=ef7pDxBvtyQ) 

---

## Reinstalación del sistema

### ¿Cuál es el procedimiento para reinstalar ContaPyme?

**Respuesta:**  
Si necesitas reinstalar ContaPyme en tu equipo, es importante que hagas un respaldo y sigas estos pasos con cuidado para no perder información. 

1. 💾 **Respaldar la información**  
   - Copia la carpeta de datos (por defecto se encuentra en `C:\ProgramData\InSoft\`) o genera un copia de seguridad por cada área de trabajo. 
   - Guárdala en un dispositivo externo o en otra ubicación segura.
2. 🔄 **Desactiva la licencia**  
   - Ingresa al sistema ContaPyme
   - Botón de aplicación → Servidor → Catálogo de licencias → Desactivar licencia automáticamente.
3. ❌ **Desinstalar la versión actual**  
   - Ve al **Panel de control → Programas → Desinstalar un programa**.  
   - Selecciona **ContaPyme** y desinstálalo.
4. 📥 **Descargar e instalar la versión más reciente en el nuevo equipo**  
   - Ingresa al **Portal de Clientes ContaPyme** (https://www.contapyme.com/portal-clientes/) con tu usuario y contraseña.  
   - En la barra izquierda, selecciona **Instaladores** y descarga la versión más reciente.
   - Haz doble clic en el archivo descargado, acepta el acuerdo de licenciamiento y elige la carpeta de instalación (se recomienda la predeterminada).  
   - Define la carpeta donde se almacenará la base de datos (también se recomienda la predeterminada).
   - Elige en tipo de instalación **ContaPyme principal**.  
   - Ingresa la licencia asignada.
   - Haz clic en **Finalizar** y abre el programa desde el escritorio.  
   - Al iniciar, configura la región, el PUC y la contraseña de acceso.
4. 📂 **Restaura la información**  
   - Reemplaza la carpeta **InSoft** que guardaste, en la misma ruta o usa el Explorador de copias: (Botón de aplicación → Servidor → Explorador de copias de seguridad → Recuperar). 
   - Si recuperas varias áreas, créalas antes de restaurar.
5. 🔑 **Reactiva la licencia**  
   - Botón de aplicación → Servidor → Catálogo de licencias → Activar licencia automáticamente.
6. ✔ **Valida funcionamiento**  
   - Abre ContaPyme y confirma que los datos estén intactos.

**También aplica si preguntas:**  
- ¿Cómo reinstalo ContaPyme sin perder datos?  
- ¿Qué pasos debo seguir para reinstalar ContaPyme en mi computador?  
- ¿Cuál es el procedimiento para reinstalar el software?

**Recursos adicionales:**   
- [Video: Instalación de ContaPyme principal](https://www.youtube.com/watch?v=vFFkwsIhL7s)
- [Video: Recuperación de copias de seguridad](https://www.youtube.com/watch?v=Xu6SlMfo_qA&t=150s)

---

## Descarga del sistema

### ¿Cómo puedo descargar ContaPyme?

**Respuesta:**  
1. 📥 Ingresa al **Portal de Clientes ContaPyme**.  
2. 🔑 Inicia sesión con tu usuario y contraseña.  
3. Barra izquierda **Instaladores**.  
4. Descarga la versión más reciente de **ContaPyme**.  
5. ▶️ Ejecuta el instalador como administrador.

💡 Recomendación: Descarga siempre la última versión disponible para garantizar compatibilidad y estabilidad.

**También aplica si preguntas:**  
- ¿Dónde descargo el instalador de ContaPyme?  
- ¿Cómo obtener la última versión de ContaPyme?  

**Recursos adicionales:**   
- [Video: Instalación de ContaPyme principal](https://www.youtube.com/watch?v=vFFkwsIhL7s)

---

## Actualización del sistema

### ¿Cómo puedo realizar la actualización de ContaPyme?

**Respuesta:**  
Actualizar el sistema te asegura tener mejoras, correcciones y compatibilidad con nuevas funcionalidades.

1. 📌 **Verificar la versión actual**  
   - Abre ContaPyme y revisa la barra inferior (Versión, Release y actualización).  
2. 🔍 **Consultar la última actualización disponible**  
   - Ingresa al **Portal de Clientes** con tu usuario y contraseña **Barra izquierda → Actualizaciones**.  
3. 📥 **Descargar la actualización**  
   - Descarga el archivo e instálalo directamente o guárdalo para aplicarlo en varios equipos.  
4. ▶️ **Instalar actualización**  
   - Cierra ContaPyme en todos los equipos.  
   - Ejecuta el actualizador → acepta el acuerdo de licencia → clic en siguiente → clic en **Actualizar**.  

⚠️ **Nota importante:** primero actualiza el **servidor** y luego cada computador adicional.

**También aplica si preguntas:**  
- ¿Cómo actualizar ContaPyme a la última versión?  
- ¿Qué pasos sigo para instalar las actualizaciones de ContaPyme?  

**Recursos adicionales:**   
- [Video: Actualización ContaPyme](https://www.youtube.com/watch?v=3Wlgo3oU9GQ)

---

## Diferencia de versiones entre equipos

### ¿Qué pasos seguir si el computador adicional y el principal tienen actualizaciones diferentes?

**Respuesta:**  
1. 📌 Verifica la actualización instalada en el **servidor (principal)**. 
  - Ingresa a ContaPyme en el equipo principal y en la parte inferior derecha se muestra la actualización. **Ejemplo: ContaPyme R8.20.25**  
2. 📥 Descarga la misma actualización desde el **Portal de Clientes** (https://www.contapyme.com/portal-clientes/) → **Actualizaciones**. 
  - En caso de tener en el portal una superior a la consultada, preferiblemente descargar esa y aplicarla en todos los equipos, empezando por el principal.  
3. ▶️ Instala esa misma actualización en los equipos adicionales.  


⚠️ **Importante:** servidor y clientes siempre deben estar en la **misma actualización** para evitar novedades de conexión.

**También aplica si preguntas:**  
- ¿Cómo sincronizar versiones de ContaPyme entre servidor y clientes?  
- ¿Qué hago si mi cliente está en una versión distinta al servidor?  
- El servidor ya está actualizado, pero no encuentro la misma actualización en los clientes. ¿Cómo lo soluciono?

---

## Desinstalación

### ¿Cómo se puede desinstalar ContaPyme?

**Respuesta:**  
1. ❌ Cierra todas las sesiones abiertas de ContaPyme.  
2. Ve a **Panel de control → Programas → Desinstalar un programa**.  
3. Selecciona **ContaPyme** y haz clic en **Desinstalar**.  
4. ⚠️ Si es el servidor, asegúrate de **tener respaldo** de las bases de datos y licencias antes de desinstalar. (por defecto se encuentra en `C:\ProgramData\InSoft\`) o genera un copia de seguridad por cada área de trabajo.  
5. ✔ Reinicia el computador para finalizar el proceso.

**También aplica si preguntas:**  
- ¿Cómo eliminar ContaPyme de mi computador?  
- ¿Qué debo hacer para desinstalar ContaPyme correctamente?  

---

## Compatibilidad Mac

### ¿Es posible instalar ContaPyme en un Mac?

**Respuesta:**  
No, ContaPyme no tiene versión nativa para **macOS**.  
Sin embargo, puedes usar alternativas:

- 💻 Instalar Windows en el Mac mediante **Boot Camp**.  
- 💿 Usar un software de virtualización como **Parallels Desktop** o **VMware Fusion**, e instalar Windows allí.  
- 🌐 Acceder a ContaPyme en un servidor Windows mediante **escritorio remoto**.

⚠️ Requiere que cuentes con una licencia válida de Windows para poder ejecutarlo en Mac.

**También aplica si preguntas:**  
- ¿Puedo usar ContaPyme en MacBook?  
- ¿Cómo instalar ContaPyme en un Mac?  

---

## Compatibilidad Windows

### ¿ContaPyme es compatible con las versiones recientes de Windows?

**Respuesta:**  
✅ Sí. ContaPyme es compatible con:  
- Windows 10  
- Windows 11  

⚠️ No es recomendable instalar en versiones antiguas como Windows 7 o XP, ya que no tienen soporte ni seguridad actualizada.

**También aplica si preguntas:**  
- ¿Puedo instalar ContaPyme en Windows 11?  
- ¿Qué versiones de Windows soporta ContaPyme?  

---

## Novedades en la instalación

### ¿Por qué puede fallar o no completarse correctamente la instalación de ContaPyme?

**Respuesta:**  
Las causas más comunes son:

- ❌ Antivirus o firewall bloqueando la instalación.  
- ⚠️ No ejecutar el instalador como administrador.  
- ❌ No cumplir requisitos mínimos de hardware (RAM, disco, procesador).  
- ⚠️ Otra aplicación usando Firebird en el mismo puerto.  
- ❌ Descarga incompleta o instalador dañado.  

💡 Solución:  
1. Ejecuta el instalador como administrador.  
2. Desactiva temporalmente antivirus/firewall.  
3. Verifica los requisitos mínimos.  
4. Si persiste, descarga nuevamente desde el portal o contacta soporte.

**También aplica si preguntas:**  
- ¿Por qué me da error al instalar ContaPyme?  
- ¿Qué hago si no se completa la instalación?  

---

## Instalación monousuario

### ¿Cómo instalar ContaPyme como monousuario?

**Respuesta:**  
La instalación monousuario es cuando trabajas solo en un computador, sin conexión cliente-servidor.

1. 📥 Descarga el instalador desde el **Portal de Clientes**. (https://www.contapyme.com/portal-clientes/) Usuario y contraseña → Barra izquierda → **Instaladores**.   
2. ▶️ Ejecuta el instalador y selecciona **instalación principal (servidor)**.  
3. 📋 Ingresa la licencia asignada (o usa la DEMO si aún no tienes).  
4. ✔ Finaliza la instalación y configura la región, el PUC y la contraseña de acceso.  

💡 Solo un usuario al tiempo podrá usar el sistema en ese equipo.

**También aplica si preguntas:**  
- ¿Cómo usar ContaPyme en un solo computador?  
- ¿Cómo instalar ContaPyme sin clientes adicionales?  

**Recursos adicionales:**   
- [Video: Instalación de ContaPyme principal](https://www.youtube.com/watch?v=vFFkwsIhL7s)

---

## Instalación de licencias

### ¿Dónde debo instalar las licencias en ContaPyme?

**Respuesta:**  
Las licencias siempre deben instalarse en el **computador servidor (principal)**.  

- En los **clientes adicionales**, no se instalan licencias, solo se conectan al servidor.  
- 📌 Menú: Botón de aplicación → **Servidor → Catálogo de licencias**.  
- Allí registras y activas las licencias.  

⚠️ No es posible registrar licencias en un equipo adicional.

**También aplica si preguntas:**  
- ¿Dónde registro las licencias de ContaPyme?  
- ¿Las licencias se instalan en el cliente o en el servidor?  

**Recursos adicionales:**   
- [Video: Registro de licencias](https://www.youtube.com/watch?v=ef7pDxBvtyQ&t=2s)

---

## Formateo de computador

### ¿Qué información debo guardar antes de formatear mi computador?

**Respuesta:**  
Antes de formatear tu equipo, asegúrate de:

- 📂 Carpeta **InSoft** (por defecto en `C:\ProgramData\InSoft\`).  
- 💾 Si no se guarda la carpeta, se podría generar copia de sguridad de cada área de trabajo.
- 🔑 Desactivar licencias desde  **botón de aplicación** → **Servidor** → **Catálogo de licencias**. (para reactivarlas después).  

⚠️ Si no haces este respaldo, podrías perder toda la información de tu sistema. 

**También aplica si preguntas:**  
- ¿Qué debo respaldar antes de formatear mi PC con ContaPyme?  
- ¿Cómo hacer copia de seguridad antes de reinstalar Windows?  

---

## Desactivación de licencias

### ¿Cómo desactivar las licencias para cambiar de equipo?

**Respuesta:**  
Si vas a trasladar ContaPyme a otro computador, primero desactiva la licencia:

1. Menú: Botón de aplicación → **Servidor** → **Catálogo de licencias**.  
2. 🔄 Selecciona la licencia → clic en **Desactivar licencia automáticamente**.  
3. 📋 Una vez desactivada, podrás instalar ContaPyme en el nuevo equipo.  
4. ✅ Reactiva la licencia desde el mismo catálogo en el computador nuevo.

⚠️ Debes hacer el proceso de desactivación antes de formatear o desinstalar para evitar bloqueos de activación.

**También aplica si preguntas:**  
- ¿Cómo liberar una licencia para usarla en otro computador?  
- ¿Qué pasos sigo para cambiar la licencia de equipo?  

---

## Gestión de licencias

### ¿Después de activar las licencias, cómo asignarlas a los usuarios?

**Respuesta:**  
Una vez actives tus licencias, es necesario asignarlas a los usuarios para que puedan conectarse correctamente al sistema.

1. 🔑 Ingresa a ContaPyme con un usuario administrador.  
2. Ve a **Básico → Usuarios → Crear o Modificar**.  
3. 📋 En la pestaña **Licencias**, ubica la columna **Asignar**.  
4. Marca la licencia que deseas asignar al usuario.  
5. ✔ Guarda los cambios.  
6. 🔄 Repite este proceso con cada usuario que necesite acceso.  

💡 También puedes hacerlo desde el botón de aplicación **Servidor → Catálogo de licencias → Avanzado → Inspector**, donde podrás asociar las licencias a usuarios en el área de trabajo correspondiente.

**También aplica si preguntas:**  
- ¿Cómo dar una licencia a un usuario en ContaPyme?  
- ¿Dónde asigno las licencias a los usuarios?  

---

## Actualización en equipos clientes

### ¿Cómo actualizar ContaPyme en los equipos adicionales?

**Respuesta:**  
Los equipos adicionales (clientes) siempre deben estar en la misma actualización que el servidor principal.  

1. 📌 Primero actualiza el **servidor principal** con la última actualización disponible.  
2. 📥 Descarga la misma actualización desde el **Portal de Clientes**. (https://www.contapyme.com/portal-clientes/) Usuario y contraseña → Barra izquierda → **Actualizaciones**.
3. ▶️ Instálala en cada equipo adicional:  
   - Cierra ContaPyme en el cliente.  
   - Ejecuta el archivo descargado → aceptar acuerdo de licencia → clic en siguiente → clic en **Actualizar**.  

⚠️ Importante: nunca instales una actualización diferente a la del servidor, ya que no podría establecer conexión.

**También aplica si preguntas:**  
- ¿Cómo poner al día ContaPyme en los computadores cliente?  
- ¿Qué debo hacer para actualizar ContaPyme en los adicionales?  

---

## Actualización de área de trabajo

### ¿Cómo actualizar el área de trabajo en ContaPyme?

**Respuesta:**  
El área de trabajo requiere actualización cuando se instalan nuevas actualizaciones del sistema. Este proceso solo se realiza en el equipo **Principal**

1. 🔑 En la ventana de coneión de ContaPyme ingresa un usuario administrador y contraseña.  
2. Selecciona el área que quieres actualizar y luego selecciona la opción de conectar.  
4. 📋 Haz clic en **Actualizar área de trabajo**.  También es posible **Actualizar todas las áreas de trabajo**
5. El sistema aplicará los cambios de estructura automáticamente.  

💡 Si tienes varias áreas, con la opción de **Actualizar todas las áreas de trabajo** se podrán actualizar al tiempo. 

**También aplica si preguntas:**  
- ¿Qué debo hacer para actualizar un área de trabajo en ContaPyme?  
- ¿Cómo poner al día mis áreas de trabajo después de una actualización? 

**Recursos adicionales:**   
- [Video: Actualización ContaPyme](https://www.youtube.com/watch?v=3Wlgo3oU9GQ) 

---

## Configuración en reinstalación

### ¿Qué debo poner en la ventana "Servidor de datos" al reinstalar el programa?

**Respuesta:**  
Al reinstalar ContaPyme en un cliente, se abrirá la ventana de conexión donde debes indicar la ubicación del servidor principal.

- Si estás en **red local (LAN):**  
  ➡ Ingresa la **IP local** del servidor o el **nombre del equipo principal**.  
  ➡ Ejemplo: `192.168.1.10` o `ServidorCaldas`.

- Si estás en **conexión por internet (WAN):**  
  ➡ Ingresa la **IP pública** del servidor (la entregada por el proveedor de internet).  
  ➡ Asegúrate de que el **puerto 3050** esté abierto y en estado “satisfactorio”.

Además de la dirección del servidor, completa con:  
- Usuario  
- Contraseña  
- Área de trabajo  

⚠️ Si no pones correctamente la IP o el nombre del servidor, el cliente no podrá conectarse.

**También aplica si preguntas:**  
- ¿Qué debo escribir en servidor de datos en ContaPyme?  
- ¿Qué IP debo poner al reinstalar el cliente de ContaPyme?  

---

## Problemas de acceso

### ¿Por qué no puedo acceder al sistema después de completar la instalación?

**Respuesta:**  
Si después de instalar ContaPyme no puedes ingresar, puede deberse a varias causas:
 
- ⚠️ La licencia no está activa o no fue asignada al usuario.  
- ❌ Error en el campo **Servidor de datos** (IP incorrecta o servidor no disponible).  
- ⚠️ El puerto 3050 está bloqueado por firewall o antivirus.  
- ❌ Base de datos no encontrada o dañada.  

**Solución recomendada:**  
1. Verifica la configuración en la ventana **Servidor de datos** y verifica que la ip o el nombre de equipo sea el correcto. 
2. Asegúrate de que la licencia esté activa y asignada al usuario.  
3. Desactiva temporalmente firewall o antivirus para probar la conexión.  
4. Si es necesario, revisa que la base de datos exista en el servidor.

💡 Si el problema persiste, contacta a soporte InSoft para validar configuración avanzada.

**También aplica si preguntas:**  
- ¿Qué hacer si no me deja entrar a ContaPyme después de instalar?  
- ¿Por qué no inicia ContaPyme después de la instalación?  

---

