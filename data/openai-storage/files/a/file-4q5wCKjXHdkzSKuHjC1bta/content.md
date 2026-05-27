# pf_tecnico.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **técnico**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2026/01/08



# Instalación


## Actualización del sistema

### ¿Cuáles son las posibles causas de que no pueda actualizar ContaPyme?

CANONICAL_ID: PF_TECNICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Por qué no me deja actualizar ContaPyme?  
- ¿Cuáles son las causas más comunes de error al actualizar el sistema?  
- ¿Qué debo revisar si una actualización de ContaPyme no se aplica?  
- ¿Por qué falla la actualización aunque la descargué correctamente?
- No puedo actualizar 
- Error al actualizar
- Posibles causas por las que no se puede actualizar

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Existen varias razones por las cuales una actualización de ContaPyme puede no ejecutarse correctamente.  
La mayoría están relacionadas con **versiones instaladas**, **uso del sistema en ese momento**, **vigencia de la póliza** o **condiciones técnicas generales** del equipo.

A continuación, te explicamos las causas más comunes y cómo identificarlas 👇  


**1. 🔒 ContaPyme abierto en algún equipo (servidor o adicionales)**

ContaPyme utiliza el motor de base de datos **Firebird**, el cual **bloquea archivos mientras están en uso**.  
Si el sistema está abierto en cualquiera de los siguientes casos, la actualización no podrá aplicarse:

- Computador principal (servidor).
- Equipos adicionales (clientes).
- Servicios o aplicaciones externas conectadas a la base de datos.

 **🧭 Pasos para revisar si hay usuarios conectados**

1. 🖥️ **Ubícate en el computador principal (servidor).**  
   Solo desde allí puedes ver y administrar los usuarios conectados.

2. 📂 **Abre el menú principal:**  
   - Haz clic en el **Botón de ContaPyme** (parte superior izquierda).

3. 👥 **Selecciona la opción “Usuarios conectados”.**  
 La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Usuarios conectados](https://www.contapyme.com/conocimientocontapyme/010_BS/usuarios_conectados.png)
 
   Aquí verás un listado con:  
   - Nombre del usuario  
   - Fecha y hora de conexión  
   - Equipo o máquina desde donde ingresó  
   Esto te permitirá identificar que usuarios quedan pendientes por cerrar sesión para proceder con la actualización.

✅ **Solución:**  
Cierra ContaPyme en **todos los equipos**, verifica que ningún usuario esté conectado y luego ejecuta nuevamente la actualización.


**2. ⬇️ Intentar instalar una actualización inferior a la versión instalada**

No es posible aplicar una actualización que sea **igual o inferior** a la versión que ya tiene el sistema instalada.

Ejemplo:  
- Sistema instalado: **R8.20.30**  
- Actualización descargada: **R8.20.25** ❌

En este caso, el sistema no permitirá continuar con el proceso.

✅ **Solución:**  
Verifica la versión actual instalada en la parte inferior del programa y descarga únicamente una **versión superior** desde el Portal de Clientes.


**3. 📄 Póliza de soporte vencida o no vigente**

El acceso a las actualizaciones de ContaPyme está condicionado a tener una **póliza de soporte vigente**.  
Si la póliza no ha sido renovada, el sistema no permitirá descargar o aplicar nuevas actualizaciones.

✅ **Solución:**  
Comunícate con el **área comercial** para validar el estado de la póliza y realizar la renovación correspondiente.


**4. ⚙️ Causas técnicas generales**

Además de lo anterior, pueden presentarse situaciones técnicas comunes como:

- ❌ El archivo de actualización está incompleto o dañado.
- ⚠️ La actualización no se ejecuta como administrador.
- 🛡️ El antivirus o firewall bloquea el proceso.
- 💾 Falta de permisos en las carpetas del sistema.
- 🔁 Procesos de Firebird activos en segundo plano.

✅ **Recomendaciones generales:**  
- Descarga nuevamente el actualizador desde el portal de clientes.
- Ejecuta el archivo de actualización con clic derecho → **Ejecutar como administrador**.  
- Desactiva temporalmente el antivirus durante la actualización.  
- Reinicia el computador antes de intentar nuevamente el proceso.  
- Asegúrate de usar el archivo descargado directamente desde el **Portal de Clientes ContaPyme**.

  **📞 ¿Y si el problema continúa?**

Si después de validar todos los puntos anteriores **no logras completar la actualización**, se recomienda:

👉 **Solicitar un tiquete (TK) al área de soporte técnico de InSoft**, donde un asesor podrá revisar el caso puntual, validar versiones, conexiones activas y ayudarte a completar el proceso de forma segura.

---

## ContaExcel Add-In

### ¿Qué es ContaExcel Add-In?

CANONICAL_ID: PF_TECNICO  
TYPE: FAQ_CANONICA  
ALLOW_REWRITE: FALSE  
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK  

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.  

- ¿Qué es ContaExcel Add-In?  
- ¿Para qué sirve ContaExcel Add-In?  
- ¿Cómo funciona ContaExcel Add-In en ContaPyme?  
- ¿ContaExcel Add-In es compatible con Excel a 64 bits?  
- ¿Qué puedo hacer con ContaExcel Add-In?  

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
ContaExcel Add-In es un **complemento para Microsoft Excel** que permite conectar las hojas de cálculo directamente con la información almacenada en ContaPyme o AgroWin.  

Su principal función es facilitar la **consulta, análisis y generación de reportes dinámicos**, permitiendo a los usuarios trabajar en Excel con datos reales del sistema, sin necesidad de exportaciones manuales.

**📊 ¿Para qué sirve?**

Con ContaExcel Add-In puedes:

- Generar **informes financieros personalizados**.  
- Crear **reportes contables y administrativos**.  
- Construir **modelos de análisis y estadísticas**.  
- Elaborar **indicadores, costos, presupuestos e impuestos**.  
- Mantener la información **actualizada automáticamente** desde ContaPyme.  

**⚙️ ¿Cómo funciona?**

El complemento agrega funciones especiales dentro de Excel que permiten:

- Consultar datos directamente desde la base de datos de ContaPyme.  
- Integrar estas funciones con las fórmulas propias de Excel.  
- Trabajar sobre cualquier empresa dentro del área de trabajo activa.  

**⚠️ Consideraciones importantes**

- 📌 ContaExcel Add-In **requiere licenciamiento** para su uso.  
- 🖥️ Esta versión (V4.0) fue desarrollada para **Excel de 32 bits** (versiones como 2007 y 2010).  
- ⚠️ No es compatible con versiones modernas de Excel en 64 bits o entornos web.  
- 📚 Se recomienda que el usuario tenga conocimientos básicos en **manejo de Excel y fórmulas** para aprovecharlo correctamente.
- ⚠️ ContaExcel Add-In ha sido reemplazado progresivamente por nuevos desarrollos e integraciones con Excel, como **Contapyme para Excel**, diseñados para ofrecer mayor compatibilidad y capacidades avanzadas.


**🚀 Evolución de la herramienta**

Actualmente, ContaPyme ha evolucionado esta funcionalidad hacia una nueva solución llamada:

👉 **ContaPyme para Excel**

Esta nueva alternativa ofrece mejoras importantes:

- ✅ Compatibilidad con **Excel en la web (Office 365)**.  
- ✅ Soporte para **arquitecturas de 64 bits**.  
- ✅ Enfoque más moderno, flexible y multiplataforma.  

Por lo tanto, ContaExcel Add-In puede considerarse como la **base o versión anterior**, mientras que ContaPyme para Excel representa la **evolución actual de la integración con Excel**.  

---

## Contapyme para excel

### ¿Qué es ContaPyme para Excel?

CANONICAL_ID: PF_TECNICO  
TYPE: FAQ_CANONICA  
ALLOW_REWRITE: FALSE  
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK  

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.  

- ¿Qué es ContaPyme para Excel?  
- ¿Para qué sirve ContaPyme para Excel?  
- ¿Cómo funciona ContaPyme para Excel?  
- ¿Qué puedo hacer con ContaPyme para Excel?  
- Integración de ContaPyme con Excel  
- Nuevo complemento de Excel de ContaPyme  
- ¿Cuál es la nueva versión de ContaExcel Add-In?  

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
ContaPyme para Excel es un **complemento moderno para Microsoft Excel** que permite acceder directamente a la información del sistema contable ContaPyme desde hojas de cálculo.  

Este complemento incorpora **más de 200 funciones personalizadas**, facilitando la conexión entre Excel y los datos contables para su consulta, análisis y presentación en tiempo real.


**📊 ¿Para qué sirve?**

ContaPyme para Excel permite:

- Crear **informes contables personalizados**.  
- Generar **indicadores financieros y gráficos dinámicos**.  
- Construir **reportes a la medida** según las necesidades del usuario.  
- Integrar información de ContaPyme con otras fuentes en Excel.  
- Optimizar el **análisis y gestión de la información financiera**.  

Todo esto aprovechando la potencia de Excel junto con los datos actualizados del sistema.


**🕒 ¿Cuándo se utiliza?**

Se recomienda usar ContaPyme para Excel cuando:

- Se requieren **informes personalizados** que no están disponibles en el sistema.  
- Se necesita mayor flexibilidad en la presentación de la información.  
- Se desea trabajar con **modelos, análisis o reportes avanzados en Excel**.  
- Se requiere integrar datos contables con otras herramientas o fuentes.  


**⚙️ ¿Cómo funciona?**

El complemento se integra directamente con Excel y permite:

- Utilizar funciones especiales para consultar datos de ContaPyme.  
- Actualizar la información en tiempo real desde el sistema.  
- Combinar funciones propias de Excel con datos contables.  

Esto brinda una experiencia más flexible, moderna y eficiente frente a herramientas anteriores.


**⚠️ Consideraciones importantes**

Para utilizar ContaPyme para Excel, ten en cuenta:

- 🌐 Es necesario contar con **conexión a internet**.  
- 📄 Se requiere tener **póliza PLUS vigente**.  
- 💻 Es recomendable usar **versiones actualizadas de Microsoft Excel (Office 365 o 2017 en adelante)**.  
- 📚 Se sugiere tener conocimientos básicos en **manejo de Excel y fórmulas**.  


**📘 Guía de configuración y uso**

Para conocer el proceso de instalación, configuración y uso detallado, consulta la guía oficial por medio de la siguiente URL:

👉 [Documento: guía paso a paso Contapyme para Excel](https://www.contapyme.com/contapyme/2025/3-julio/docs/Guia_ContaPyme_para_Excel.pdf)


**🚀 Importante**

ContaPyme para Excel es la **evolución del antiguo ContaExcel Add-In**, ofreciendo:

- Compatibilidad con **Excel moderno y versiones web**.  
- Soporte para **arquitecturas de 64 bits**.  
- Mayor estabilidad, flexibilidad y capacidad de integración.  

Esto lo convierte en la herramienta recomendada actualmente para trabajar la información de ContaPyme en Excel.  

#### 📌 Recursos adicionales   
- [Video: creación de agentes para contapyme para excel](https://youtu.be/mQ35bLjNbzk?si=I5rW3WQxM_V3fLkw)
- [Video: Que es y como agregar el complemento de contapyme para excel](https://youtu.be/3saTO2XNK68?si=ShiSdx8iFBvi29LN)



---

## Licenciamiento y configuración del sistema

### ¿Por qué aparece el mensaje “La licencia es incorrecta” y veo símbolos extraños al ingresar al programa?

CANONICAL_ID: PF_TECNICO  
TYPE: FAQ_CANONICA  
ALLOW_REWRITE: FALSE  
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK  

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.  

- Me sale “la licencia es incorrecta” al ingresar
- Aparecen caracteres extraños en la licencia  
- El sistema muestra símbolos raros y errores con simbolos raros en las pestañas 
- La licencia quedó inválida con caractéres extraños
- Error de licencia con caracteres extraños 

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Si al ingresar a ContaPyme aparece el mensaje **“La licencia es incorrecta”** y adicionalmente observas **símbolos extraños, caracteres raros o textos dañados en pestañas y ventanas**, normalmente la novedad está relacionada con una configuración regional de Windows.

En algunos casos, esta configuración puede alterar la forma en que el sistema interpreta ciertos caracteres, afectando la lectura de la licencia y generando errores visuales en el programa.

**🔍 Posibles causas**

**1. 🔐 Licencia mal digitada o inconsistente**

Una de las causas más comunes es que la licencia:

- esté mal escrita  
- tenga espacios adicionales  
- contenga caracteres incorrectos  
- haya sido copiada con formato alterado  

Esto puede provocar que el sistema la detecte como inválida.

**2. ⚠️ Configuración de Windows que altera caracteres**

Existe una configuración del sistema operativo que puede modificar la codificación de caracteres y afectar directamente la lectura de licencias.

La opción a validar es:

✔️ **“Versión beta: Use UTF-8 Unicode para la compatibilidad de idioma en todo el mundo”**

Cuando esta casilla está activada, en algunos equipos puede:

- reemplazar caracteres válidos por símbolos extraños  
- alterar códigos de licencia  
- generar textos corruptos en pestañas y formularios  
- afectar tanto el servidor como los equipos adicionales  

**🖥️ ¿Cómo validar y desactivar esta opción?**

Sigue esta ruta en Windows:

1. Ve a **Panel de control**  
2. Ingresa a **Reloj y región**  
3. Selecciona **Región**  
4. Abre la pestaña **Administrativo**  
5. Haz clic en **Cambiar configuración regional del sistema…**  
6. Verifica la opción:

☑️ **Versión beta: Use UTF-8 Unicode para la compatibilidad de idioma en todo el mundo**

7. Si está marcada, **desactívala**  
8. Haz clic en **Aceptar**  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Configuracion regional version beta](https://www.contapyme.com/conocimientocontapyme/010_BS/version_beta_cfg_regional.png)

9. Reinicia el equipo  


**⚠️ Importante**

Esta validación debe realizarse en:

- 🖥️ el **servidor principal**
- 💻 los **equipos adicionales** que se conectan al servidor  

Si cualquiera de estos equipos tiene esta opción activa, puede continuar presentándose la novedad.


**✅ Recomendación**

Después de desactivar esta opción:

- reinicia el equipo  
- vuelve a ingresar al sistema  
- valida nuevamente la licencia  
- verifica si desaparecieron los símbolos extraños  

**📞 ¿Y si el problema continúa?**

Si después de realizar esta configuración la novedad persiste:

👉 Se recomienda **generar un tiquete (TK) al área de soporte técnico**, ya que puede tratarse de un caso puntual de licencia o de configuración específica del equipo.

En estos escenarios, soporte podrá validar de forma detallada la licencia, el entorno y la conectividad entre equipos.  