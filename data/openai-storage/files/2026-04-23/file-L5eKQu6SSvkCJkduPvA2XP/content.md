# gm_activos.md
> **Propósito:** Documentar procedimientos paso a paso del módulo **Activos**, garantizando que Paty IA pueda explicar procesos con claridad y precisión.
> **Tipo de documento:** Guía de montaje (GM)
> **Función:** Procedimientos detallados 
> **Fecha:** 11/11/2025
> **Versión:** 1

---

# Guía de montaje

##  ACTIVOS

Esta guía lo orientará en el montaje de un sistema de control automatizado de
los activos.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que cumplir previamente al
montaje del módulo de activos.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del sistema básico [aquí](<?id=\[GM\]1010>).

## Capacitación del módulo

Realice el proceso de capacitación del módulo de contabilidad básico
[aquí](<https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD110>).

## Genere una lista de los activos que la empresa posee y va a sistematizar

Genere una lista de los activos que la empresa posee y va a sistematizar. Los
datos depreciación acumulada y vida útil restante se deben generar a la fecha
en la cual se va a realizar el cargue de activos en la contabilidad.

Ejemplo: Fecha de cargue 31-12-2017

Código | Nombre | Fecha compra | Valor compra | Depreciación acumulada | Vida útil restante
---|---|---|---|---|---
COM001 | Computador Dell | 05-10-2016 | $ 1.800.000 | $ 750.000 | 21 meses
COM002 | Impresora HP | 04-12-2016 | $ 1.260.000 | $ 455.000  | 23 meses
VEH001  | Vehículo Toyota | 07-01-2016  | $ 45.000.000 | $ 18.000.000 | 36 meses
OFC001  | Televisor Lg 72´´ | 08-04-2016  | $ 4.500.000 | $ 787.500 | 99 meses
OFC002  | Escritorio gerencia | 14-05-2016 | $ 2.250.000 | $ 356.250 | 101 meses

##  Análisis de grupos de activos

Esta sección indica cómo revisar los grupos de activos que tiene pre-
configurados \[ContaPyme\].

## Requisitos

Analice en conjunto con el encargado del área contable de la empresa, el valor
en el “Estado de situación financiera o balance general” correspondiente a los
activos que posee la empresa, para su posterior registro de manera individual
por cada tipo de activo.

Revise en el plan único de cuentas, las cuentas de activos con el fin de
determinar si requiere crear auxiliares.

Verifique que las cuentas de activos \(depreciaciones, amortizaciones,
valorizaciones, revaluaciones, deterioros, etc\), tengan marcada la opción
“exige activo/diferido”.**\[Pestaña: Contabilidad > Catálogo de plan de
cuentas > Se ubica la cuenta del activo > Clic derecho “Modificar” > Opción
“Exige activo/diferido”\]**.


## Preparación de la información

Reúna el listado de activos según los grupos de activos que \[ContaPyme\]
tiene pre-configurados.


Ejemplo:

Grupo  | Activo
---|---
1516 – Construcciones y edificaciones | Oficina Calle 100 \# 50-60
Bodega Av. Santander
TV Lg 52´´  | Vehículo Toyota
Escritorio gerencia
Silla ergonómica
1528 – Equipo de cómputo y comunicaciones
Portátil Acer 224
Planta telefónica
Impresora multifuncional HP
Etc.  |


Revise el comportamiento contable de cada grupo de activo:

  * Cuenta guía del activo.
  * Cuenta de depreciación \(débito y crédito\).
  * Cuenta de valorización \(débito y crédito\).
  * Cuenta de revaluación NIIF \(débito y crédito\).
  * Cuenta de deterioro NIIF \(débito y crédito\).
  * Cuenta de utilidad en venta.
  * Cuenta de pérdida en venta.
  * Cuenta de pérdida por baja.

Se entiende por comportamiento contable las cuentas que se deben afectar de
manera automática al momento de realizar diferentes acciones con los activos
como: compras, depreciaciones, ventas, bajas, reclasificaciones, etc.

## Procedimiento en \[ContaPyme\]

Ingrese a \[ContaPyme\]

Vaya a la pestaña **Adicionales.**

Ingrese por la opción **“Configurador del módulo de activos”.**
En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de este módulo.
  * Botón de ayudas acerca de este módulo.

Ingrese al catálogo de grupos de activos**\[Cinta de opciones: Adicionales >
Grupos de activos\]**.

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de grupos de activos”.**
En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de este catálogo.
  * Botón de ayudas acerca de este catálogo.

\[ContaPyme\] ya tiene pre-configurados múltiples grupos de activos que por
ley se administran en una empresa, sin embargo, permite crear nuevos grupos de
activos según los requerimientos de la empresa **\[Cinta de opciones del
catálogo: Crear\].**
Para obtener información acerca de la codificación de los grupos de activos
consulte la ventana de **Más Información** del código.


##  Creación de activos

Esta sección indica cómo crear los activos \(ficha técnica\) en \[ContaPyme\]

## Requisitos

Previo a la creación de activos, se recomienda revisar las configuraciones en
los grupos de activos como indica en las secciones 2 y 3 de esta guía.

## Preparación de la información

Asocie cada uno de los activos listados inicialmente con los respectivos
grupos de activos definidos en la sección 2 de esta guía.


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de activos **\[Cinta de opciones: Adicionales > Catálogo
de activos\]**.

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de activos”.**
En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de este catálogo.
  * Botón de ayudas acerca de este catálogo.


Registre los activos que la empresa posee **\[Cinta de opciones del catálogo:
Crear\]**.


Ejemplo:

Activo | Grupo
---|---
Oficina Calle 100 \# 50-60 | 1516 – Construcciones y edificaciones
Bodega Av. Santander  | 1516 – Construcciones y edificaciones
TV Lg 52´´ | 1524 – Equipo oficina
Escritorio gerencia | 1524 – Equipo oficina
Silla ergonómica | 1524 – Equipo oficina
Computador Dell 1580 | 1528 – Equipo de cómputo y comunicaciones
Portátil Acer 224 | 1528 – Equipo de cómputo y comunicaciones
Planta telefónica  | 1528 – Equipo de cómputo y comunicaciones
Impresora multifuncional HP | 1528 – Equipo de cómputo y comunicaciones
Etc. |


Para obtener información acerca de la codificación de activos consulte la
ventana de Más Información del código [aquí](<?id=1148020>)

##  Registro del cargue inicial de activos

Esta sección indica cómo realizar el cargue inicial de activos.

## Requisitos

Tenga creados los activos, como se indica la sección 3 de esta guía.

## Preparación de la información

Tenga a disposición la lista de activos que va registrar dentro del sistema
\[ContaPyme\] \(según la información solicitada en la sección 1 de esta
guía\).

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Básico >
Operaciones\]**.

Ingrese a la operación de cargue inicial de activos**\[Más operaciones >
Cargue inicial > Cargue de saldos actualizados de activos\]**.

Diligencie la operación indicando por cada activo información relevante como:

Ejemplo:

Código | Nombre | Fecha compra | Valor compra | Depreciación acumulada | Vida útil restante \(local\) | Vida útil restante \(NIIF\)
---|---|---|---|---|---|---
COM001 | Computador Dell | 05-10-2016 | $ 1.800.000 | $ 750.000 | 21 meses | 30 meses
COM002 | Impresora HP | 04-12-2016 | $ 1.260.000 | $ 455.000  | 23 meses | 35 meses
VEH001  | Vehículo Toyota | 07-01-2016  | $ 45.000.000 | $ 18.000.000 | 36 meses | 50 meses
OFC001  | Televisor Lg 72´´ | 08-04-2016  | $ 4.500.000 | $ 787.500 | 99 meses | 110 meses
OFC002  | Escritorio gerencia | 14-05-2016 | $ 2.250.000 | $ 356.250 | 101 meses | 115 meses

La vida útil restante bajo la contabilidad local o fiscal, corresponde a los
meses pendientes que faltan por usar el activo según una tabla de vidas útiles
que las entidades estatales estipulan, sin embargo para la vida útil restante
bajo la contabilidad NIIF, corresponde a una proyección o estimación de uso
que se le pretende dar al activo, la cual fija cada empresa.

En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de esta operación.
  * Botón de ayuda acerca de esta operación.

Realice la contrapartida contable, a través de una operación de cargue inicial
de cuentas **\[Más operaciones > Cargue inicial > Cargue inicial de
cuentas\]**.


##  Configuraciones adicionales para el manejo de activos \(opcional\)

Esta sección indica cómo realizar configuraciones adicionales \(dependen de
cada tipo de empresa\) para el manejo del módulo de activos.

## Requisitos

Haber seguido todos los pasos de las secciones anteriores de esta guía.

## Preparación de la información

Defina políticas empresariales respecto al manejo de activos bajo las NIIF:

  * Si la empresa pertenece al grupo 2 o 3 de las NIIF \(Pymes, microempresas\), defina si va a manejar revaluaciones de los activos.
  * Defina el monto mínimo que la empresa va a utilizar para la creación de activos.

## Procedimiento

Para la activación de revaluaciones de activos en empresas que pertenecen al
grupo 2 o 3 NIIF \(Pymes, microempresas\), active la siguiente configuración:

  * Ingrese por el **\[botón aplicación > configuración > configuración general de contabilidad > configuraciones adicionales para contabilización NIIF > Permitir en activo el manejo de revaluaciones, para empresas de NIIF grupos 2 y 3.\]**.


Para configurar el monto mínimo que la empresa va a utilizar para reconocer un
activo, ubíquese en el catálogo de activos y realice la siguiente
configuración:

  * **\[Cinta de opciones del catálogo > configuración > configuraciones generales > monto mínimo para reconocer un activo.\] **Adicione por cada año, el monto mínimo que la empresa va a utilizar como base para el reconocimiento de un activo.

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].
