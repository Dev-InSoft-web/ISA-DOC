# gen_reglas_dian.md
> **Propósito:** Centralizar todas las reglas de validación de rechazo DIAN (Facturación Electrónica, Nota Crédito y Nota Débito) para que **Paty IA** pueda interpretarlas correctamente y orientar al usuario con la plantilla *Error tipo C*.  
> **Tipo de documento:** Conocimiento general (GEN)  
> **Función:** Reglas DIAN – Validación previa (Resolución 000165)  
> **Última actualización:** 2025/11/14  
> **Versión:** 1.0  

---

## Tipos de documento DIAN incluidos

**F.V.E – Factura Electrónica de Venta**  
Documento electrónico obligatorio que registra la operación de venta ante la DIAN, con validación previa.

**N.C.E – Nota Crédito Electrónica**  
Documento electrónico utilizado para corregir, anular o modificar valores de una factura electrónica previamente emitida.

**N.D.E – Nota Débito Electrónica**  
Documento electrónico utilizado para incrementar valores o adicionar cobros a una factura electrónica ya validada.

---

# Rechazos DIAN – Validación Previa (Resolución 000165)

Documento generado automáticamente a partir de la tabla oficial suministrada.

---

## 🔹 Código: FAB03
**Tipo de documento:** F.V.E
**Elemento:** DianExtensions

### ✔ Regla DIAN
Solamente puede haber una ocurrencia de un grupo UBLExtension conteniendo el grupo sts:DianExtensions

### ✔ Mensaje DIAN
> Más de un grupo UBLExtension conteniendo el grupo sts:DianExtensions

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB05a
**Tipo de documento:** F.V.E
**Elemento:** InvoiceAuthorization

### ✔ Regla DIAN
Número de la autorización de la numeración que debe existir

### ✔ Mensaje DIAN
> No se encuentra el número de autorización del rango de numeración otorgado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB05b
**Tipo de documento:** F.V.E
**Elemento:** InvoiceAuthorization

### ✔ Regla DIAN
El número de la autorización de la numeración debe corresponder al número de información de este contribuyente emisor para este Proveedor de Autorización

### ✔ Mensaje DIAN
> Número de la autorización de la numeración no corresponde a un número de autorización de este contribuyente emisor para este Proveedor de Autorización

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB07a
**Tipo de documento:** F.V.E
**Elemento:** StartDate

### ✔ Regla DIAN
Fecha de inicio de la información de autorización para la numeración debe ser anterior o igual a la fecha de la emisión de la factura (solamente para facturas)

### ✔ Mensaje DIAN
> Fecha de emisión anterior a la fecha de inicio de la autorización de la numeración StartDate > IssueDate

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB07b
**Tipo de documento:** F.V.E
**Elemento:** StartDate

### ✔ Regla DIAN
Fecha inicial del rango de numeración informado corresponde a la fecha inicial de los rangos vigente para el contribuyente.

### ✔ Mensaje DIAN
> Fecha inicial del rango de numeración informado NO corresponde a la fecha inicial de los rangos vigente para el contribuyente.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB08a
**Tipo de documento:** F.V.E
**Elemento:** EndDate

### ✔ Regla DIAN
Fecha final de la autorización para la numeración debe ser posterior o igual a la fecha de la emisión de la factura (solamente para facturas)

### ✔ Mensaje DIAN
> Fecha de emisión posterior a la fecha final de la autorización de numeración EndDate < IssueDate

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB08b
**Tipo de documento:** F.V.E
**Elemento:** EndDate

### ✔ Regla DIAN
Fecha final del rango de numeración informado corresponde a la fecha final de los rangos vigente para el contribuyente

### ✔ Mensaje DIAN
> Fecha final del rango de numeración informado no corresponde a la fecha final de los rangos vigente para el contribuyente

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB10a
**Tipo de documento:** F.V.E
**Elemento:** Prefix

### ✔ Regla DIAN
Si Prefix existe entonces debe ser igual al código de la sucursal
/Invoice/ext:UBLExtensions/ext:UBLExt ension/ext:ExtensionContent/sts:DianE xtensions/sts:InvoiceControl/sts:Autho rizedInvoices/sts:Prefix =
/Invoice/cac:AccountingSupplierParty/ cac:Party/cac:PartyLegalEntity/cac:Cor porateRegistrationScheme/cbc:ID

### ✔ Mensaje DIAN
> No es igual al código de la sucursal correspondiente a este punto de facturación

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB10b
**Tipo de documento:** F.V.E
**Elemento:** Prefix

### ✔ Regla DIAN
Debe corresponder al prefijo de la autorización de numeración

### ✔ Mensaje DIAN
> El prefijo no corresponde al prefijo de la autorización de numeración

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB11a
**Tipo de documento:** F.V.E
**Elemento:** From

### ✔ Regla DIAN
Valor inicial del rango de numeración debe estar informado

### ✔ Mensaje DIAN
> Valor inicial del rango de no está informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB11b
**Tipo de documento:** F.V.E
**Elemento:** From

### ✔ Regla DIAN
Valor inicial del rango de numeración informado debe corresponder al valor inicial de los rangos vigentes para el contribuyente emisor
si From no corresponde al inicio de un rango autorizado en el sistema de numeración para el emisor de la FE

### ✔ Mensaje DIAN
> Valor inicial del rango de numeración informado no corresponde a un valor inicial de los rangos vigentes para el contribuyente emisor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB12a
**Tipo de documento:** F.V.E
**Elemento:** To

### ✔ Regla DIAN
Valor final del rango de numeración debe estar informado

### ✔ Mensaje DIAN
> Valor final del rango de no está informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB12b
**Tipo de documento:** F.V.E
**Elemento:** To

### ✔ Regla DIAN
Valor final del rango de numeración informado debe corresponder al valor final de los rangos vigentes para el contribuyente emisor
Si elemento no corresponde al final de un rango autorizado en el Sistema de numeración para el emisor de la FE

### ✔ Mensaje DIAN
> Valor final del rango de numeración informado no corresponde a un valor final de los rangos vigentes para el contribuyente emisor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB19a
**Tipo de documento:** F.V.E
**Elemento:** ProviderID

### ✔ Regla DIAN
NIT del Prestador de Servicios debe estar informado

### ✔ Mensaje DIAN
> NIT del Prestador de Servicio no fue informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB19b
**Tipo de documento:** F.V.E
**Elemento:** ProviderID

### ✔ Regla DIAN
NIT del Prestador de Servicios debe estar registrado en la DIAN

### ✔ Mensaje DIAN
> NIT del Prestador de Servicios no está autorizado para prestar servicios

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB22a
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
DV del NIT del Proveedor Tecnológico debe ser informado

### ✔ Mensaje DIAN
> Fue informado que Prestador de Servicios está identificado por NIT y el DV no fue informado en el atributo @schemeID

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB22b
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
DV del NIT del Prestador de Servicios

### ✔ Mensaje DIAN
> DV del NIT del Prestador de Servicios no está correctamente calculado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB23
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Tipo de identificador fiscal de la persona debe corresponder a un valor codificado

### ✔ Mensaje DIAN
> Identificador del tipo de documento de identidad no es igual a 31

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB24a
**Tipo de documento:** F.V.E
**Elemento:** softwareID

### ✔ Regla DIAN
Valida que se encuentre el Identificador del software habilitado para la emisión de facturas

### ✔ Mensaje DIAN
> No se encuentra informado el código de software

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB24b
**Tipo de documento:** F.V.E
**Elemento:** softwareID

### ✔ Regla DIAN
Identificador del software asignado cuando el software se activa en el Sistema de Facturación Electrónica debe corresponder a un software autorizado para este OFE.

### ✔ Mensaje DIAN
> Identificador del software asignado cuando el software se activa en el Sistema de Facturación Electrónica no corresponde a un software autorizado para este OFE

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB24c
**Tipo de documento:** F.V.E
**Elemento:** softwareID

### ✔ Regla DIAN
Identificador del software asignado cuando el software se activa en el Sistema de Facturación Electrónica debe estar activo

### ✔ Mensaje DIAN
> Identificador del software informado se encuentra inactivo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB27a
**Tipo de documento:** F.V.E
**Elemento:** SoftwareSecurityCode

### ✔ Regla DIAN
Valida que se informe el código de seguridad del software

### ✔ Mensaje DIAN
> No se encuentra el código de seguridad del software

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB27b
**Tipo de documento:** F.V.E
**Elemento:** SoftwareSecurityCode

### ✔ Regla DIAN
Huella del software que autorizó la DIAN al Obligado a Facturar Electrónicamente o al Proveedor Tecnológico

### ✔ Mensaje DIAN
> Huella no corresponde a un software autorizado para este OFE

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB31
**Tipo de documento:** F.V.E
**Elemento:** AuthorizationProviderID

### ✔ Regla DIAN
Valida que se encuentre informado el NIT del Proveedor Autorizado (800197268)

### ✔ Mensaje DIAN
> AuthorizationProviderID no corresponde al NIT de la DIAN (800197268)

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB34
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Si Proveedor está Autorizado está identificado por NIT (@schemeName=31), el DV del NIT debe ser informado en @schemeID. Nota: DV de DIAN es 4

### ✔ Mensaje DIAN
> El DV del NIT no está informado o no es correcto

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB35
**Tipo de documento:** F.V.E
**Elemento:** schemeName

### ✔ Regla DIAN
Tipo de identificador fiscal de la persona debe corresponder a un valor codificado igual a 31

### ✔ Mensaje DIAN
> Identificador del tipo de documento de identidad no es igual a 31

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAB36
**Tipo de documento:** F.V.E
**Elemento:** QRCode

### ✔ Regla DIAN
Colocar la definición de este código

### ✔ Mensaje DIAN
> No está informado el valor del Código QR

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAC03
**Tipo de documento:** F.V.E
**Elemento:** Signature

### ✔ Regla DIAN
Solamente puede haber una ocurrencia de un grupo UBLExtension conteniendo el grupo ds:Signature

### ✔ Mensaje DIAN
> Solamente puede haber una ocurrencia de un grupo UBLExtension conteniendo el grupo ds:Signature

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD01
**Tipo de documento:** F.V.E
**Elemento:** UBLVersionID

### ✔ Regla DIAN
Versión base de UBL debe ser “UBL 2.1”

### ✔ Mensaje DIAN
> UBLVersionID : no contiene el literal “UBL 2.1”

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD02
**Tipo de documento:** F.V.E
**Elemento:** CustomizationID

### ✔ Regla DIAN
Indicador del tipo de operación

### ✔ Mensaje DIAN
> CustomizationID no indica un valor válido para el tipo de operación

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD03
**Tipo de documento:** F.V.E
**Elemento:** ProfileID

### ✔ Regla DIAN
Versión del Formato debe ser “Factura Electrónica de Venta”

### ✔ Mensaje DIAN
> ProfileID : no contiene el literal “DIAN 2.1: Factura Electrónica de Venta”

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD04
**Tipo de documento:** F.V.E
**Elemento:** ProfileExecutionID

### ✔ Regla DIAN
Ambiente de autorización al que se destina este documento, debe contener el código correcto para indicar si es producción o pruebas

### ✔ Mensaje DIAN
> ProfileExecutionID no indica un valor válido para ambiente de destino del documento (1= Producción; 2= Prueba)

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD05a
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Número de factura solo puede contener números y letras

### ✔ Mensaje DIAN
> No se permiten caracteres adicionales como espacios o guiones

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD05b
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Valida rango inferior de numeración otorgado
/Invoice/cbc:ID > =
/Invoice/ext:UBLExtensions/ext:UBLExtension/ext:ExtensionContent/sts:DianE xtensions/sts:InvoiceControl/sts:Autho rizedInvoices/sts:From

### ✔ Mensaje DIAN
> Número de factura es inferior al número inicial del rango de numeración autorizado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD05c
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Valida que el Número de factura no sea superior al rango final de numeración otorgado

### ✔ Mensaje DIAN
> Número de factura es superior al número final del rango de numeración autorizado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD05d
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Número de factura debe estar contenido en el rango de numeración autorizado.

### ✔ Mensaje DIAN
> Número de factura no está contenido en el rango de numeración autorizado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD05e
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Número de factura debe existir para el número de autorización informado.

### ✔ Mensaje DIAN
> Número de factura no existe para el número de autorización.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD06
**Tipo de documento:** F.V.E
**Elemento:** UUID

### ✔ Regla DIAN
El CUFE debe ser calculado de acuerdo con lo que se especifica en el anexo técnico

### ✔ Mensaje DIAN
> Valor del CUFE no está calculado correctamente

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD07
**Tipo de documento:** F.V.E
**Elemento:** schemeID

### ✔ Regla DIAN
Código que describe el “ambiente de destino donde será procesada la validación previa de este documento electrónico”; este código es el testigo de que el valor registrado en cbc:UUID.@schemeID es lo que desea realizar el HFE: en igualdad confirma el ambiente y en desigualdad rechaza el procesamiento.

### ✔ Mensaje DIAN
> @schemeID no indica un valor válido para ambiente de destino del documento (1= Producción; 2= Prueba)

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD08
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Identificador del algoritmo utilizado para el cálculo del CUFE.

### ✔ Mensaje DIAN
> No fue utilizado o informado uno de los algoritmos permitidos para el cálculo del CUFE.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD09a
**Tipo de documento:** F.V.E
**Elemento:** IssueDate

### ✔ Regla DIAN
Valida que fecha de factura sea igual o superior a fecha de inicio de la autorización de la numeración
Invoice/cbc:IssueDate debe ser igual o superior a Invoice/ext:UBLExtensions/ext:UBLExte nsion/ext:ExtensionContent/sts:DianEx tensions/sts:InvoiceControl/sts:Authori
zationPeriod/cbc:StartDate

### ✔ Mensaje DIAN
> Fecha de emisión anterior a la fecha de inicio de la autorización de la numeración

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD09b
**Tipo de documento:** F.V.E
**Elemento:** IssueDate

### ✔ Regla DIAN
Valida que fecha de factura sea igual o inferior a fecha de fin de la autorización de la numeración
/Invoice/cbc:IssueDate debe ser igual o inferior a
/Invoice/ext:UBLExtensions/ext:UBLExt ension/ext:ExtensionContent/sts:DianE xtensions/sts:InvoiceControl/sts:Autho rizationPeriod/cbc:EndDate

### ✔ Mensaje DIAN
> Fecha de emisión posterior a la fecha final de la autorización de la numeración

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD09e
**Tipo de documento:** F.V.E
**Elemento:** IssueDate

### ✔ Regla DIAN
Valida que fecha de generación de la factura sea igual a la fecha de firma de la factura

### ✔ Mensaje DIAN
> La fecha de generación de la factura es diferente a la fecha de firma de la factura

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD12a
**Tipo de documento:** F.V.E
**Elemento:** InvoiceTypeCode

### ✔ Regla DIAN
La factura debe ser de uno de los tipos permitidos.

### ✔ Mensaje DIAN
> Código de tipo de factura inválido

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD12b
**Tipo de documento:** F.V.E
**Elemento:** InvoiceTypeCode

### ✔ Regla DIAN
Valida que el código de tipo de factura informado corresponda a uno de los tipos validos

### ✔ Mensaje DIAN
> El código informado no corresponde a un tipo válido para este tipo de documento

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD15a
**Tipo de documento:** F.V.E
**Elemento:** DocumentCurrencyCode

### ✔ Regla DIAN
Divisa aplicable a toda la factura debe estar definida en esta él estándar internacional ISO 4217

### ✔ Mensaje DIAN
> Código de divisa inválido

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD15b
**Tipo de documento:** F.V.E
**Elemento:** DocumentCurrencyCode

### ✔ Regla DIAN
Divisa aplicable a toda la factura informada en este elemento debe corresponder al mismo valor para todos los @currencyID, excepto para la información que se exprese en la UBLExtensión /Invoice/ext:UBLExtensions/ext:UBLExtension/ext:ExtensionContent/CustomTagGeneral/TotalesCop

### ✔ Mensaje DIAN
> Código de divisa inválido

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAD16
**Tipo de documento:** F.V.E
**Elemento:** LineCountNumeric

### ✔ Regla DIAN
El número declarado de líneas de la factura debe corresponder al número de grupos InvoiceLine

### ✔ Mensaje DIAN
> LineCountNumeric : diferente del número de ocurrencias del grupo
/Invoice/cac:InvoiceLine

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBH04
**Tipo de documento:** F.V.E
**Elemento:** UUID

### ✔ Regla DIAN
Se debe diligenciar únicamente cuando la FE se origina a partir de la corrección o ajuste que se da mediante un NC
Rechazo si CUDE NC referenciada no existe

### ✔ Mensaje DIAN
> CUDE de NC referenciada no existe

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBI02
**Tipo de documento:** F.V.E
**Elemento:** DebitNoteDocumentReference

### ✔ Regla DIAN
Grupo de información para nota débito relacionada

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBI03
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Prefijo + Número de la nota débito relacionada

### ✔ Mensaje DIAN
> ID de ND de referencia no relacionada

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBI04
**Tipo de documento:** F.V.E
**Elemento:** UUID

### ✔ Regla DIAN
Se debe diligenciar únicamente cuando la FE se origina a partir de la corrección o ajuste que se da mediante un ND
Rechazo si CUDE ND referenciada no existe

### ✔ Mensaje DIAN
> CUDE de ND referenciada no existe

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBI06
**Tipo de documento:** F.V.E
**Elemento:** IssueDate

### ✔ Regla DIAN
Fecha de emisión de la nota débito relacionada debe ser anterior a la fecha de la factura 
Rechazo si Fecha ND referenciada posterior a Invoice/cbc:IssueDate

### ✔ Mensaje DIAN
> Fecha ND referenciada anterior a fecha de la factura

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAI01
**Tipo de documento:** F.V.E
**Elemento:** AdditionalDocumentReference

### ✔ Regla DIAN
Valida que exista grupo de referencia para a factura tipo 03 (Contingencia)
Solo es Obligatorio para factura tipo 03 (Contingencia) /Invoice/cbc:InvoiceTypeCode = “03” y el grupo /Invoice/cac:AdditionalDocumentRefer ence no es informado
Si tipo de documentos es de otro tipo, entonces no hay validación sobre este grupo de valores

### ✔ Mensaje DIAN
> Rechazo por
/Invoice/cbc:InvoiceTypeCode =
“03” y el grupo
/Invoice/cac:AdditionalDocumentR eference No está informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAI02
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Prefijo y Número del documento referenciado

### ✔ Mensaje DIAN
> ID de Documento de referencia no relacionado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAI03
**Tipo de documento:** F.V.E
**Elemento:** UUID

### ✔ Regla DIAN
CUFE o CUDE del documento referenciado

### ✔ Mensaje DIAN
> No fue informado el CUFE o CUDE del documento referenciado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ01
**Tipo de documento:** F.V.E
**Elemento:** AccountingSupplierParty

### ✔ Regla DIAN
Grupo con información que definen el obligado a facturar: Emisor de la factura

### ✔ Mensaje DIAN
> No se informaron los datos del emisor de la factura

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ02a
**Tipo de documento:** F.V.E
**Elemento:** AdditionalAccountID

### ✔ Regla DIAN
Valida que este informado el tipo de tipo de sujeto del emisor

### ✔ Mensaje DIAN
> No se encuentra el tipo de organización del emisor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ02b
**Tipo de documento:** F.V.E
**Elemento:** AdditionalAccountID

### ✔ Regla DIAN
Valida que el tipo de sujeto informado del emisor este en lista

### ✔ Mensaje DIAN
> Emisor debe ser persona natural o jurídica (AccountingSupplierParty/cbc:Addi tionalAccountID)

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ03
**Tipo de documento:** F.V.E
**Elemento:** Party

### ✔ Regla DIAN
Valida que este informado el grupo con información general sobre el obligado  a Facturar

### ✔ Mensaje DIAN
> No se encuentra el grupo Party del emisor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ08
**Tipo de documento:** F.V.E
**Elemento:** Address

### ✔ Regla DIAN
El grupo deberá estar conformado al menos por el conjunto de elementos
ID, CityName, CountrySubentity, CountrySubentityCode,
AddressLine, Line, Country, IdentificationCode

### ✔ Mensaje DIAN
> No fue informado el conjunto de elementos: ID, CityName, CountrySubentity, CountrySubentityCode, AddressLine, Line, Country, IdentificationCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ09
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Valida que código de municipio debe corresponder a un valor válido de lista de municipios

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ12
**Tipo de documento:** F.V.E
**Elemento:** CountrySubentityCode

### ✔ Regla DIAN
Si este es un grupo con información con respeto a la dirección del emisor de un documento electrónico, debe ser un código de Departamento de Colombia

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ15
**Tipo de documento:** F.V.E
**Elemento:** Country

### ✔ Regla DIAN
Se debe informar el grupo con información sobre el país

### ✔ Mensaje DIAN
> No se encuentra el grupo Country

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ16
**Tipo de documento:** F.V.E
**Elemento:** IdentificationCode

### ✔ Regla DIAN
Código identificador del país del emisor debe corresponder al literal "CO"

### ✔ Mensaje DIAN
> Código del país del emisor del documento NO corresponde al literal "CO"

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ19
**Tipo de documento:** F.V.E
**Elemento:** PartyTaxScheme

### ✔ Regla DIAN
Se debe informar el grupo de información tributaria del emisor

### ✔ Mensaje DIAN
> No se encuentra el grupo PartyTaxScheme

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ20
**Tipo de documento:** F.V.E
**Elemento:** RegistrationName

### ✔ Regla DIAN
Nombre o Razón Social del emisor debe ser informado

### ✔ Mensaje DIAN
> Nombre No informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ21
**Tipo de documento:** F.V.E
**Elemento:** CompanyID

### ✔ Regla DIAN
NIT del emisor

### ✔ Mensaje DIAN
> NIT no autorizado a facturar electrónicamente

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ24a
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Rechazo si el atributo @schemeName es 31 y no se informa el DV en este campo.

### ✔ Mensaje DIAN
> No está informado el DV del NIT

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ24b
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Valida que el DV del NIT del emisor informado sea correcto

### ✔ Mensaje DIAN
> El DV del NIT no es correcto

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ25
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Identificador del tipo de documento de identidad (@schemeName=31) del Emisor que indica que él está identificado por NIT y por tanto el DV del NIT debe ser informado en atributo @schemeID

### ✔ Mensaje DIAN
> El contenido de este atributo no corresponde a uno de los valores posibles de las listas

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ26
**Tipo de documento:** F.V.E
**Elemento:** TaxLevelCode

### ✔ Regla DIAN
Valida que Responsabilidad informada por emisor se encuentren dentro de la lista.
Para reportar varias obligaciones / responsabilidades, se deben reportar separando cada uno de los valores de la lista con; Ejemplo O-06; O-07; ya así sucesivamente, de acuerdo a las responsabilidades a reportar

### ✔ Mensaje DIAN
> Responsabilidad informada por emisor no válida según la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ28
**Tipo de documento:** F.V.E
**Elemento:** RegistrationAddress

### ✔ Regla DIAN
Grupo de información para informar dirección fiscal

### ✔ Mensaje DIAN
> No fue informado el conjunto de elementos: ID, CityName, CountrySubentity, CountrySubentityCode, AddressLine, Line, Country, IdentificationCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ29
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Valida que código de municipio debe corresponder a valor válido de lista de municipios

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ32
**Tipo de documento:** F.V.E
**Elemento:** CountrySubentityCode

### ✔ Regla DIAN
Si IdentificationCode es “CO”, CountrySubentity debe corresponder a uno de los valores de la lista correspondiente

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ35
**Tipo de documento:** F.V.E
**Elemento:** Country

### ✔ Regla DIAN
Grupo con información sobre el país

### ✔ Mensaje DIAN
> No se encuentra el grupo Country

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ36
**Tipo de documento:** F.V.E
**Elemento:** IdentificationCode

### ✔ Regla DIAN
Código identificador del país del emisor debe corresponder al literal "CO"

### ✔ Mensaje DIAN
> Código del país del emisor del documento NO corresponde al literal "CO"

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ39
**Tipo de documento:** F.V.E
**Elemento:** TaxScheme

### ✔ Regla DIAN
Debe existir un grupo …//cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cac:TaxScheme

### ✔ Mensaje DIAN
> No se encuentra el grupo TaxScheme del emisor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ42
**Tipo de documento:** F.V.E
**Elemento:** PartyLegalEntity

### ✔ Regla DIAN
Grupo de información legal del emisor

### ✔ Mensaje DIAN
> No se encuentra el grupo PartyLegalEntity del emisor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ43a
**Tipo de documento:** F.V.E
**Elemento:** RegistrationName

### ✔ Regla DIAN
Nombre o Razón Social del emisor debe ser informado

### ✔ Mensaje DIAN
> Nombre No informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ43b
**Tipo de documento:** F.V.E
**Elemento:** RegistrationName

### ✔ Regla DIAN
Nombre o Razón Social del emisor debe corresponder al informado en el

### ✔ Mensaje DIAN
> Nombre informado No corresponde   al registrado en el

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ44a
**Tipo de documento:** F.V.E
**Elemento:** CompanyID

### ✔ Regla DIAN
NIT del emisor

### ✔ Mensaje DIAN
> NIT no autorizado a facturar electrónicamente

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ44b
**Tipo de documento:** F.V.E
**Elemento:** CompanyID

### ✔ Regla DIAN
NIT o documento de identificación del emisor debe corresponder al informado en el RUT y debe coincidir con la Razón Social o Nombre comercial registrado.

### ✔ Mensaje DIAN
> Nit o Documento de Identificación informado No corresponde al registrado en el RUT con respecto a la razón social o nombre comercial suministrado.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ47
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
El atributo (@schemeName=31), el DV del NIT debe ser informado en @schemeID

### ✔ Mensaje DIAN
> DV del NIT del emisor no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ48
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Identificador del tipo de documento de identidad (@schemeName=31) del Emisor que indica que él está identificado por NIT y por tanto el DV del NIT debe ser informado en atributo @schemeID

### ✔ Mensaje DIAN
> El contenido de este atributo no corresponde a 31

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ49
**Tipo de documento:** F.V.E
**Elemento:** CorporateRegistrationScheme

### ✔ Regla DIAN
Grupo de información de registro del emisor

### ✔ Mensaje DIAN
> No se encuentra el grupo PartyLegalEntity del emisor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ53
**Tipo de documento:** F.V.E
**Elemento:** PartecipationPercent

### ✔ Regla DIAN
Si se informa
/Invoice/cac:AccountingSupplierParty/ cac:Party/cac:PartyLegalEntity/cac:Sha reholderParty entonces de debe informar el porcentaje de los participantes del consocio o unión temporal

### ✔ Mensaje DIAN
> No se ha informado el porcentaje de los participantes del consorcio

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ54
**Tipo de documento:** F.V.E
**Elemento:** Party

### ✔ Regla DIAN
Si se informa
/Invoice/cac:AccountingSupplierParty/ cac:Party/cac:PartyLegalEntity/cac:Sha reholderParty, entonces este Grupo de elemento permite registrar la información de un consorcio

### ✔ Mensaje DIAN
> No se encuentra el grupo ShareholderParty del emisor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ55
**Tipo de documento:** F.V.E
**Elemento:** PartyTaxScheme

### ✔ Regla DIAN
Grupo de información tributaria de los participantes del consorcio

### ✔ Mensaje DIAN
> No se encuentra el grupo PartyTaxScheme del emisor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ60
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Si el participante del consorcio está identificado por NIT (@schemeName=31), el DV del NIT debe ser informado en @schemeID

### ✔ Mensaje DIAN
> DV del NIT del participante no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ61
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Identificador del tipo de documento de identidad (@schemeName=31) del Participante del Consorcio que indica que él está identificado por NIT y por tanto el DV del NIT debe ser informado en atributo @schemeID

### ✔ Mensaje DIAN
> El contenido de este atributo no corresponde a 31

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAJ71
**Tipo de documento:** F.V.E
**Elemento:** ElectronicMail

### ✔ Regla DIAN
Correo electrónico de recepción de documentos electrónicos del ecosistema de facturación electrónica de venta con validación previa

### ✔ Mensaje DIAN
> No corresponde al correo electrónico para la recepción de documentos e instrumentos electrónicos no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK01
**Tipo de documento:** F.V.E
**Elemento:** AccountingCustomerParty

### ✔ Regla DIAN
Grupo con información que definen el Adquiriente

### ✔ Mensaje DIAN
> No se encuentra el grupo AccountingCustomerParty del adquiriente

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK02
**Tipo de documento:** F.V.E
**Elemento:** AdditionalAccountID

### ✔ Regla DIAN
Valida que este informado el tipo de organización jurídica del receptor

### ✔ Mensaje DIAN
> No se encuentra el tipo de organización del receptor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK03
**Tipo de documento:** F.V.E
**Elemento:** Party

### ✔ Regla DIAN
Valida que este informado el grupo con información general sobre el adquiriente

### ✔ Mensaje DIAN
> No se encuentra el grupo Party del adquiriente

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK61
**Tipo de documento:** F.V.E
**Elemento:** PartyIdentification

### ✔ Regla DIAN
Grupo para informar el documento del adquirente

### ✔ Mensaje DIAN
> Si el valor de AdditionalAccountID es igual a "2" y el grupo no es informado.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK62
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Identificación del adquirente

### ✔ Mensaje DIAN
> Si el valor de AdditionalAccountID es igual a "2" y el elemento está vacío.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK63
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Atributo Identificador del tipo de documento

### ✔ Mensaje DIAN
> La información suministrada no corresponde a un valor de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK64
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Atributo para informar el DV del documento

### ✔ Mensaje DIAN
> La información suministrada no corresponde a un valor de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK19
**Tipo de documento:** F.V.E
**Elemento:** PartyTaxScheme

### ✔ Regla DIAN
Grupo de información tributaria del Adquiriente.
Notificación:
Si el grupo no es informado y si se cumple al menos una de las siguientes situaciones:
Si el adquiriente es persona jurídica:
AdditionalAccountID contiene “1”  Si el adquiriente es persona natural: AdditionalAccountID contiene “2”
En caso de operación de exportación:
Si //cbc:InvoiceTypeCode = “02”
Si el valor total de la factura es mayor de 100 UVT:
si
//LegalMonetaryTotal/cbc:PayableAmo unt es superior a este monto

### ✔ Mensaje DIAN
> No se encuentra el grupo PartyTaxScheme

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK20
**Tipo de documento:** F.V.E
**Elemento:** RegistrationName

### ✔ Regla DIAN
Nombre registrado en el RUT. Si el adquiriente es persona jurídica desea también utilizar el nombre comercial en el archivo de la factura, debe utilizar el elemento
…//cac:AccountingCustomerParty/cac:Party/cac:PartyName/cbc:Name
Si el adquiriente es responsable debe informar su NIT CompanyID/@schemeName es 31, el adquiriente debe informar el nombre registrado en el RUT en el elemento
…//cac:AccountingCustomerParty/cac: Party/cac:PartyTaxScheme/cbc:Registr ationName

### ✔ Mensaje DIAN
> Nombre o razón social no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK21
**Tipo de documento:** F.V.E
**Elemento:** CompanyID

### ✔ Regla DIAN
Id del adquiriente debe ser informado

### ✔ Mensaje DIAN
> ID de adquiriente no Informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK24
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Rechazo si el atributo @schemeName es 31 y no se informa el DV en este campo.

### ✔ Mensaje DIAN
> No está informado el DV del NIT

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK25
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Valida que el DV del NIT del emisor informado sea correcto

### ✔ Mensaje DIAN
> El DV del NIT no es correcto

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK29
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
SI IdentificationCode=CO, valida que código de municipio debe corresponder a valor válido de lista de municipios

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK32
**Tipo de documento:** F.V.E
**Elemento:** CountrySubentityCode

### ✔ Regla DIAN
Si IdentificationCode es “CO”, CountrySubentity debe corresponder a uno de los valores de la Columna Código de la lista correspondiente

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK36
**Tipo de documento:** F.V.E
**Elemento:** IdentificationCode

### ✔ Regla DIAN
Código identificador del país del adquiriente debe estar en lista

### ✔ Mensaje DIAN
> Código del país del adquiriente del documento NO corresponde a un código de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK42
**Tipo de documento:** F.V.E
**Elemento:** PartyLegalEntity

### ✔ Regla DIAN
Grupo de información legal del adquiriente

### ✔ Mensaje DIAN
> Grupo No informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK43
**Tipo de documento:** F.V.E
**Elemento:** RegistrationName

### ✔ Regla DIAN
Nombre o Razón Social del adquiriente debe ser informado

### ✔ Mensaje DIAN
> Nombre No informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK44
**Tipo de documento:** F.V.E
**Elemento:** CompanyID

### ✔ Regla DIAN
ID del adquiriente

### ✔ Mensaje DIAN
> ID adquiriente no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK47
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Si el atributo (@schemeName=31), el DV del NIT debe ser informado en @schemeID

### ✔ Mensaje DIAN
> DV del NIT del adquiriente no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK48
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
SI Identificador del tipo de documento de identidad (@schemeName=31) indica que está identificado por NIT y por tanto el DV del NIT debe ser informado en atributo @schemeID

### ✔ Mensaje DIAN
> El contenido de este atributo no corresponde a uno de los valores posibles de las listas

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK51
**Tipo de documento:** F.V.E
**Elemento:** Contact

### ✔ Regla DIAN
Grupo de detalles con información de contacto del adquiriente

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAK55
**Tipo de documento:** F.V.E
**Elemento:** ElectronicMail

### ✔ Regla DIAN
Correo electrónico de recepción de documentos. Si el adquiriente es facturador electrónico, esta información debe ser la misma cuando actúa como emisor.

### ✔ Mensaje DIAN
> Correo electrónico no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM05
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Si IdentificationCode=CO, Valida que código de municipio debe corresponder a un valor de lista de municipios

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM08
**Tipo de documento:** F.V.E
**Elemento:** CountrySubentityCode

### ✔ Regla DIAN
Si IdentificationCode es “CO”, CountrySubentity debe corresponder a uno de los valores de la lista correspondiente

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM09
**Tipo de documento:** F.V.E
**Elemento:** AddressLine

### ✔ Regla DIAN
Grupo de elemento que identifica libremente la dirección

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM10
**Tipo de documento:** F.V.E
**Elemento:** Line

### ✔ Regla DIAN
Elemento de texto libre, que se puede elegir utilizar para poner todas las informaciones de la dirección, en lugar de utilizar elementos estructurados (los demás elementos de este grupo)

### ✔ Mensaje DIAN
> Informar la dirección, sin ciudad ni departamento

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM11
**Tipo de documento:** F.V.E
**Elemento:** Country

### ✔ Regla DIAN
Se debe informar el grupo con información sobre el país,

### ✔ Mensaje DIAN
> No se encuentra el grupo Country

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM12
**Tipo de documento:** F.V.E
**Elemento:** IdentificationCode

### ✔ Regla DIAN
Código identificador del país del emisor debe estar en lista "

### ✔ Mensaje DIAN
> Código del país del receptor del documento NO corresponde a un código de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM19
**Tipo de documento:** F.V.E
**Elemento:** Address

### ✔ Regla DIAN
Grupo con datos sobre la dirección de la empresa de transporte

### ✔ Mensaje DIAN
> El grupo deberá estar conformado al menos por el conjunto de elementos
ID, CityName, CountrySubentity, CountrySubentityCode,

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM20
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Si IdentificationCode=CO, Valida que código de municipio debe corresponder a valor válido de lista de municipios

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM23
**Tipo de documento:** F.V.E
**Elemento:** CountrySubentityCode

### ✔ Regla DIAN
Si IdentificationCode es “CO”, CountrySubentity debe corresponder a uno de los valores de la lista correspondiente.

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM26
**Tipo de documento:** F.V.E
**Elemento:** Country

### ✔ Regla DIAN
Se debe informar el grupo con información sobre el país,

### ✔ Mensaje DIAN
> No se encuentra el grupo Country

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM27
**Tipo de documento:** F.V.E
**Elemento:** IdentificationCode

### ✔ Regla DIAN
Código identificador del país del emisor debe estar en lista "

### ✔ Mensaje DIAN
> Código del país del receptor del documento NO corresponde a un código de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM30
**Tipo de documento:** F.V.E
**Elemento:** PartyTaxScheme

### ✔ Regla DIAN
Grupo de información tributaria del transportador

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM32
**Tipo de documento:** F.V.E
**Elemento:** CompanyID

### ✔ Regla DIAN
Identificador del transportador

### ✔ Mensaje DIAN
> Si el transportador es responsable debe informar NIT

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM35
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Si (@schemeName=31), el DV del NIT debe ser informado en @schemeID

### ✔ Mensaje DIAN
> DV del NIT del transportador no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM36
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Identificador del tipo de documento de identidad (@schemeName=31) está identificado con NIT y por tanto el DV del NIT debe ser informado en atributo @schemeID

### ✔ Mensaje DIAN
> El contenido de este atributo no corresponde a uno de los valores posibles de las listas

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM37
**Tipo de documento:** F.V.E
**Elemento:** TaxLevelCode

### ✔ Regla DIAN
Valida que Responsabilidad informada por transportador se encuentren dentro de la lista.
Para reportar varias obligaciones / responsabilidades, se deben reportar separando cada uno de los valores de la lista con; Ejemplo O-06; O-07; ya así sucesivamente, de acuerdo a las responsabilidades a reportar

### ✔ Mensaje DIAN
> Responsabilidad informada para transportador no válido según lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM38
**Tipo de documento:** F.V.E
**Elemento:** @listName

### ✔ Regla DIAN
Régimen al que pertenece el transportador

### ✔ Mensaje DIAN
> No fue informado el Régimen al que pertenece el transportador

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM40
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Si IdentificationCode=CO, valida que código de municipio debe corresponder a valor válido de lista de municipios

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM43
**Tipo de documento:** F.V.E
**Elemento:** CountrySubentityCode

### ✔ Regla DIAN
Si IdentificationCode es “CO”, CountrySubentity debe corresponder a uno de los valores de la lista correspondiente

### ✔ Mensaje DIAN
> Este código no corresponde a un valor válido de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM46
**Tipo de documento:** F.V.E
**Elemento:** Country

### ✔ Regla DIAN
Se debe informar el grupo con información sobre el país,

### ✔ Mensaje DIAN
> No se encuentra el grupo Country

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM47
**Tipo de documento:** F.V.E
**Elemento:** IdentificationCode

### ✔ Regla DIAN
Código identificador del país del emisor debe estar en lista "

### ✔ Mensaje DIAN
> Código del país del receptor del documento NO corresponde a un código de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM54
**Tipo de documento:** F.V.E
**Elemento:** RegistrationName

### ✔ Regla DIAN
Nombre o Razón Social del transportador

### ✔ Mensaje DIAN
> Nombre registrado en el RUT. Si el transportador es persona jurídica desea también utilizar el nombre comercial en el archivo de la factura, debe utilizar el elemento
…//cac:AccountingSupplierParty/ca
c:Party/cac:PartyName/cbc:Name

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM55
**Tipo de documento:** F.V.E
**Elemento:** CompanyID

### ✔ Regla DIAN
Identificador del transportador

### ✔ Mensaje DIAN
> Si transportador es responsable, NIT del transportador

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM58
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Si el atributo (@schemeName=31), el DV del NIT debe ser informado en @schemeID

### ✔ Mensaje DIAN
> DV del NIT del transportador no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAM59
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Identificador del tipo de documento de identidad (@schemeName=31) del transportador que indica que él está identificado por NIT y por tanto el DV del NIT debe ser informado en atributo @schemeID

### ✔ Mensaje DIAN
> El contenido de este atributo no corresponde a uno de los valores posibles de las listas

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAN01
**Tipo de documento:** F.V.E
**Elemento:** PaymentMeans

### ✔ Regla DIAN
Grupo de campos para información relacionadas con el pago de la factura.

### ✔ Mensaje DIAN
> Rechazo si grupo no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAN02
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
El método de pago debe estar relacionado en la tabla del 0.
Rechazo: si el valor de este elemento no corresponde a un valor de la
columna “Código”

### ✔ Mensaje DIAN
> Método de pago inválido

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAN03
**Tipo de documento:** F.V.E
**Elemento:** PaymentMeansCode

### ✔ Regla DIAN
El medio de pago debe ser informado con relación a la tabla 0

### ✔ Mensaje DIAN
> Medio de pago informado es invalido

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAN04
**Tipo de documento:** F.V.E
**Elemento:** PaymentDueDate

### ✔ Regla DIAN
Fecha de vencimiento de la factura o fecha de compromiso de pago.
Obligatorio si es venta a crédito.
Rechazo: Si PaymentMeans/ID = 2 y PaymentDueDate no es informado

### ✔ Mensaje DIAN
> Venta a crédito sin información de fecha en la cual se comprometió el pago

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBD02
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Identificación del pago del anticipo

### ✔ Mensaje DIAN
> No fue informado el identificador del pago para el anticipo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBD03
**Tipo de documento:** F.V.E
**Elemento:** PaidAmount

### ✔ Regla DIAN
Valor del pago del anticipo
No puede ser superior al valor total de la factura
Notificación: si
…//PrepaidPayment/cbc:PaidAmount >
/Invoice/cac:LegalMonetaryTotal/cbc:P ayableAmount

### ✔ Mensaje DIAN
> El valor del anticipo no puede ser superior al valor total de la factura

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBD04
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15 ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBD05
**Tipo de documento:** F.V.E
**Elemento:** ReceivedDate

### ✔ Regla DIAN
Fecha en la cual el pago fue recibido

### ✔ Mensaje DIAN
> No se informó la Fecha en la cual el pago fue recibido

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAQ02
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Número de cargo o descuento

### ✔ Mensaje DIAN
> Valida que los números de línea del documento sean consecutivos

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAQ03
**Tipo de documento:** F.V.E
**Elemento:** ChargeIndicator

### ✔ Regla DIAN
Indica que el elemento es un Cargo o un descuento
Rechazo: Si este elemento contiene una información diferente de “true” o “false”

### ✔ Mensaje DIAN
> ChargeIndicator contiene
información diferente de “true” o “false”

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAQ06
**Tipo de documento:** F.V.E
**Elemento:** MultiplierFactorNumeric

### ✔ Regla DIAN
Porcentaje a aplicar. Porcentaje aplicado en decimales
Rechazo: si este elemento > 100

### ✔ Mensaje DIAN
> Porcentaje que aplica superior al 100%

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAQ07
**Tipo de documento:** F.V.E
**Elemento:** Amount

### ✔ Regla DIAN
Valor total del cargo o descuento.
Valor numérico del Cargo el Descuento.
Si es descuento, no puede ser superior al valor base.
Rechazo:Si
…//AllowanceCharge/cbc:ChargeIndicator es true y
…//AllowanceCharge/cbc:Amount >…//AllowanceCharge/cbc:BaseAmount

### ✔ Mensaje DIAN
> Descuento superior al valor base

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAQ08
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAQ09
**Tipo de documento:** F.V.E
**Elemento:** BaseAmount

### ✔ Regla DIAN
Si es descuento, no puede ser superior al valor total de la factura
Notificación: si
…//AllowanceCharge/cbc:ChargeIndicator es true y …//AllowanceCharge/cbc:BaseAmount>
…//LegalMonetaryTotal/cbc:LineExtensionAmount…//LegalMonetaryTotal/cbc:TaxInclusiveAmount

### ✔ Mensaje DIAN
> Valor Base para calcular el descuento o cargo no puede ser superior al valor total de la factura

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAQ10
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAR01
**Tipo de documento:** F.V.E
**Elemento:** PaymentExchangeRate

### ✔ Regla DIAN
Grupo de campos para información relacionadas con la tasa de cambio de moneda extranjera a peso colombiano (COP).
Seguir definición estándar del UBL para este grupo

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAR02
**Tipo de documento:** F.V.E
**Elemento:** SourceCurrencyCode

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAR03
**Tipo de documento:** F.V.E
**Elemento:** SourceCurrencyBaseRate

### ✔ Regla DIAN
Base monetaria de la divisa extranjera para el cambio. Debe ser 1.00

### ✔ Mensaje DIAN
> SourceCurrencyBaseRate trae valor diferente a 1.00

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAR04
**Tipo de documento:** F.V.E
**Elemento:** TargetCurrencyCode

### ✔ Regla DIAN
Divisa a la cual se hace la conversión
Debe ir diligenciado en COP, si el cbc:DocumentCurrencyCode es diferente a COP
Ver lista de valores posibles en 0
Rechazo si no corresponde a valor en la lista

### ✔ Mensaje DIAN
> No corresponde a valor en la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAR05
**Tipo de documento:** F.V.E
**Elemento:** TargetCurrencyBaseRate

### ✔ Regla DIAN
Base monetaria para la conversión. Debe ser 1.00

### ✔ Mensaje DIAN
> TargetCurrencyBase trae valor diferente a 1.00

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAR06
**Tipo de documento:** F.V.E
**Elemento:** CalculationRate

### ✔ Regla DIAN
Valor de la tasa de cambio entre las divisas.
Se debe diligenciar con el valor de la tasa de cambio. Por ejemplo: para USDCOP puede ser el valor de la TRM o tasa acordada entre las partes.
Recuerde que el valor registrado, es la base para la conversión de la tasa de cambio de la siguiente manera:
Valor reportado * Valor de tasa de cambio = Valor en reportado en divisa informada en TargetCurrencyCode.
Este valor es el que se debe registrar para reportar los valores en la segunda divisa, y en la representación gráfica, si así lo requiere el emisor.

### ✔ Mensaje DIAN
> No es informado el elemento.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAR07
**Tipo de documento:** F.V.E
**Elemento:** Date

### ✔ Regla DIAN
Fecha en la que se fijó la tasa de cambio (CalculationRate)

### ✔ Mensaje DIAN
> Fecha en la que se acordó la tasa de cambio

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS01a
**Tipo de documento:** F.V.E
**Elemento:** TaxTotal

### ✔ Regla DIAN
Solamente puede existir un grupo de campos para información de totales relacionadas con un tributo en particular, si hay más de una tarifa del mismo impuesto se deben informar en TaxSubtotal diferentes dentro del mismo TaxTotal

### ✔ Mensaje DIAN
> Tributo informado no coincide, revisar Porcentaje, Nombre, y ID. Debe existir un TaxTotal a nivel de la cabecera por cada tipo de impuesto que se informa a nivel de línea con las características correspondiente al mismo impuesto

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS01b
**Tipo de documento:** F.V.E
**Elemento:** TaxTotal

### ✔ Regla DIAN
Valida que existe solo un grupo con información de totales para un mismo tributo en la factura y que los impuestos IVA (01), INC (04) deben existir también en al menos una línea de la factura, si hay más de una tarifa del mismo impuesto se deben informar en TaxSubtotal diferentes dentro del mismo TaxTotal

### ✔ Mensaje DIAN
> Tributo IVA (01), INC (04)
informado no coincide, revisar Porcentaje, Nombre y ID. Debe existir un TaxTotal a nivel de la cabecera por cada tipo de impuesto que se informa a nivel de línea con las características correspondiente al mismo impuesto.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS02
**Tipo de documento:** F.V.E
**Elemento:** TaxAmount

### ✔ Regla DIAN
Suma de todos los elementos
../cac:TaxTotal/TaxSubtotal/cbc:TaxAm ount de cada uno de los impuestos.
Rechazo:
Si ../cac:TaxTotal/cbc:TaxAmount <> sumatoria de todas las ocurrencias de
../cac:TaxTotal/TaxSubtotal/cbc:TaxAm ount

### ✔ Mensaje DIAN
> Valor total de un tributo no corresponde a la suma de toda la información correspondiente a
cada una de las tarifas informadas en este documento para este tributo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS03
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS04
**Tipo de documento:** F.V.E
**Elemento:** TaxSubtotal

### ✔ Regla DIAN
Grupo de información que definen los valores del tributo

### ✔ Mensaje DIAN
> Debe ser informado un grupo de estos para cada tarifa.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS05
**Tipo de documento:** F.V.E
**Elemento:** TaxableAmount

### ✔ Regla DIAN
Base Imponible sobre la que se calcula el valor del tributo
En el caso de que el tributo es un porcentaje del valor tributable: informar la base imponible en valor monetario
En el caso de que el tributo es un valor fijo por unidad tributada: informar el número de unidades tributadas

### ✔ Mensaje DIAN
> No fue informado el elemento

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS06
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS07
**Tipo de documento:** F.V.E
**Elemento:** TaxAmount

### ✔ Regla DIAN
Valor del tributo: producto del porcentaje aplicado sobre la base imponible.
Rechazo: Para tributos cuya tarifa se enuncia en porcentajes.
Si: ../cac:TaxTotal/cbc:TaxAmount <>
../cac:TaxTotal/cbc:TaxableAmount *
../cac:TaxTotal/cbc:Percent Rechazo:
Para tributos cuya tarifa se enuncia en valores nominales (ejemplo bolsas plásticas)
Si: ../cac:TaxTotal/cbc:TaxAmount <>
../cac:TaxTotal/cbc:PerUnitAmount *
/cac:TaxTotal/cbc:TaxableAmount
Rechazo: para el impuesto Nominal IBUA el cálculo, se realiza entre los valores de los campos (PerUnitAmount*BaseUnitMeasure) y su resultado debe ser dividido por cien (100)
Rechazo: para el impuesto Nominal INPP el cálculo, se realiza entre los valores de los campos (PerUnitAmount*BaseUnitMeasure)
Rechazo: para el impuesto ICUI el cálculo, se realiza entre los valores de los campos (TaxableAmount*Percent dividido por cien (100))

### ✔ Mensaje DIAN
> El valor del tributo informado no corresponde al producto del porcentaje aplicado sobre la base imponible
El valor del tributo no corresponde al precio unitario del impuesto multiplicado por la cantidad de ítem vendidos

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS08
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS09
**Tipo de documento:** F.V.E
**Elemento:** BaseUnitMeasure

### ✔ Regla DIAN
Usado en el caso de que el tributo es un valor fijo por unidad tributada: informar el valor del tributo por unidad tributada. Por ejemplo, el impuesto de consumo a las bolsas o los impuestos a los combustibles
Rechazo:
Si elemento cbc:PerUnitAmount es informado y BaseUnitMeasure no es informado

### ✔ Mensaje DIAN
> Elemento cbc:PerUnitAmount es informado y BaseUnitMeasure no es informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS10
**Tipo de documento:** F.V.E
**Elemento:** unitCode

### ✔ Regla DIAN
Identificación de la unidad de medida

### ✔ Mensaje DIAN
> Unidad de medida no informada

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS11
**Tipo de documento:** F.V.E
**Elemento:** PerUnitAmount

### ✔ Regla DIAN
Valor del tributo por unidad
Es el valor nominal del tributo por unidad
Rechazo si el elemento cbcBaseUnitMeasure NO es informado

### ✔ Mensaje DIAN
> Rechazo por el elemento cbcBaseUnitMeasure NO es informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS12
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS15
**Tipo de documento:** F.V.E
**Elemento:** TaxScheme

### ✔ Regla DIAN
Grupo de información específica sobre el tributo

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAS16
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Identificador del tributo
Ver lista de valores posibles en ¡Error! No se encuentra el origen de la referencia.
Rechazo: Si el contenido de este elemento no corresponde a un contenido de la columna
“Identificador” (aceptase elemento sin contenido)

### ✔ Mensaje DIAN
> No corresponde a un valor valido de la columna “IDENTIFICADOR” de la lista de ¡Error! No se encuentra el origen de la referencia.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAT01
**Tipo de documento:** F.V.E
**Elemento:** WithholdingTaxTotal

### ✔ Regla DIAN
El emisor auto-retenedor puede utilizar este grupo para informar las autoretenciones que práctica (ReteIVA, ReteICA, ReteFuente)
Si informado debe contener:
Un bloque para cada código de tributo Rechazo: Si existe más de un grupo
/Invoice/WhitHoldingTaxl con el mismo valor en el elemento
/Invoice/WithholdingTaxTotal/TaxSubt otal/cac:TaxCategory/cac:TaxScheme/c bc:ID
Algunos tributos deben ser la suma de las líneas de la factura (Cuando se enuncian auto retenciones practicadas a nivel de línea o ítem
Rechazo: Si existe un grupo
/Invoice/WithholdingTaxTotal en el cual el valor en el elemento
/Invoice/WithholdingTaxTotal/TaxSubt otal/cac:TaxCategory/cac:TaxScheme/c bc:ID es “ReteIVA” o “ReteFuente” que se ha informado a nivel de Ítem (InvoiceLine)
y no existe ningún grupo
/Invoice/cac:InvoiceLine en el cual el elemento
/Invoice/cac:InvoiceLine/WithholdingTaxTotal/TaxSubtotal/cac:TaxCategory/c ac:TaxScheme/cbc:ID tenga el mismo valor

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAT02
**Tipo de documento:** F.V.E
**Elemento:** TaxAmount

### ✔ Regla DIAN
Valor del tributo
Suma de todos los elementos
../cac:WithholdingTaxTotal/TaxSubtota l/cbc:TaxAmount
Rechazo:Si../cac:WithholdingTaxTotal/ cbc:TaxAmount <> sumatoria de todas las ocurrencias de
../cac:WithholdingTaxTotal/TaxSubtota l/cbc:TaxAmount

### ✔ Mensaje DIAN
> No fue informado el elemento

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAT03
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAT05
**Tipo de documento:** F.V.E
**Elemento:** TaxableAmount

### ✔ Regla DIAN
Base Imponible sobre la que se calcula el valor del tributo

### ✔ Mensaje DIAN
> En el caso de que el tributo es un porcentaje del valor tributable: informar la base imponible en valor monetario
En el caso de que el tributo es un valor fijo por unidad tributada: informar el número de unidades tributadas

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAT06
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAT07
**Tipo de documento:** F.V.E
**Elemento:** TaxAmount

### ✔ Regla DIAN
Valor del tributo: producto del porcentaje aplicado sobre la base imponible
Rechazo:
Para tributos cuya tarifa se enuncia en porcentajes
si ../cac:TaxTotal/cbc:TaxAmount <>
../cac:TaxTotal/cbc:TaxableAmount *
../cac:TaxTotal/cbc:Percent Rechazo:
Para tributos cuya tarifa se enuncia en valores nominales (ejemplo bolsas plásticas)
si ../cac:TaxTotal/cbc:TaxAmount <>
../cac:TaxTotal/cbc:PerUnitAmount * InvoiceLine/cbc:InvoicedQuantity

### ✔ Mensaje DIAN
> No fue informado el elemento

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAT08
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAT11
**Tipo de documento:** F.V.E
**Elemento:** TaxScheme

### ✔ Regla DIAN
Grupo de información específica sobre el tributo

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAT12
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Identificador del tributo
Ver lista de valores posibles en ¡Error! No se encuentra el origen de la referencia.
Rechazo: Si el contenido de este elemento no corresponde a un contenido de la columna “Identificador” (aceptase elemento sin contenido)

### ✔ Mensaje DIAN
> La información suministrada no corresponde a un valor de la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU01
**Tipo de documento:** F.V.E
**Elemento:** LegalMonetaryTotal

### ✔ Regla DIAN
Grupo de campos para información relacionadas con los valores totales aplicables a la factura

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU02
**Tipo de documento:** F.V.E
**Elemento:** LineExtensionAmount

### ✔ Regla DIAN
Total valor bruto antes de tributos:
Total valor bruto, suma de los valores brutos de las líneas de la factura.
El Valor Bruto antes de tributos tiene que ser la suma de los valores de las líneas de la factura que contienen el valor comercial
Rechazo:si round(/Invoice/cac:LegalMonetaryTota l/cbc:LineExtensionAmount) es distinto de round(sum(/Invoice/cac:InvoiceLine/cb c:LineExtensionAmount))

### ✔ Mensaje DIAN
> El Valor Bruto antes de tributos no es igual a la suma de los valores de las líneas de la factura que contienen el valor comercial

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU03
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU04
**Tipo de documento:** F.V.E
**Elemento:** TaxExclusiveAmount

### ✔ Regla DIAN
Total valor base Imponible: Base imponible para el cálculo de los tributos
El Valor Base Imponible tiene que ser la suma de los valores de las bases imponibles de todas líneas de detalle.
Rechazo:
Si
round(//cbc:TaxExclusiveAmount) es distinto de round(sum(//cac:InvoiceLine/cac:TaxT otal/cac:TaxSubtotal/cbc:TaxableAmou nt))

### ✔ Mensaje DIAN
> Base Imponible es distinto a la suma de los valores de las bases imponibles de todas líneas de detalle.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU05
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU06
**Tipo de documento:** F.V.E
**Elemento:** TaxInclusiveAmount

### ✔ Regla DIAN
Total de Valor Bruto más tributos
El Valor Bruto más tributos tiene que ser igual a Valor Bruto de la factura que contienen el valor comercial más la Suma de los Tributos de todas las líneas de detalle.
Rechazo:
si round
(//cac:LegalMonetaryTotal/cbc:LineExt
ensionAmount +
sum(//cac:TaxTotal[not(ancestor:cac:InvoiceLine)]/cbc:TaxAmount) es distinto de round(//cbc:TaxInclusiveAmount)

### ✔ Mensaje DIAN
> Valor Bruto más tributos es diferente a Valor Bruto de la factura que contienen el valor comercial más la Suma de los Tributos de todas las líneas de detalle.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU07
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU08
**Tipo de documento:** F.V.E
**Elemento:** AllowanceTotalAmount

### ✔ Regla DIAN
Descuento Total: Suma de todos los descuentos aplicados a nivel de la factura
Rechazo:
Si
round(/Invoice/cac:LegalMonetaryTota l/cbc:AllowanceTotalAmount) es distinto de round (sum(/Invoice/cac:AllowanceCharge[cb c:ChargeIndicator = "false"]/cbc:Amount))

### ✔ Mensaje DIAN
> Total descuentos es diferente de la suma de todos los descuentos aplicados al total de la factura

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU09
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU10
**Tipo de documento:** F.V.E
**Elemento:** ChargeTotalAmount

### ✔ Regla DIAN
Cargo Total: Suma de todos los cargos aplicados a nivel de la factura
Rechazo: Si
round(/Invoice/cac:LegalMonetaryTota l/cbc:ChargeTotalAmount) es distinto de round(sum(/Invoice/cac:AllowanceCha rge[cbc:ChargeIndicator
="true"]/cbc:Amount))

### ✔ Mensaje DIAN
> Valor del Cargo Total es distinto a la Suma de todos los cargos globales aplicados al total de la factura.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU11
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU12
**Tipo de documento:** F.V.E
**Elemento:** PrePaidAmount

### ✔ Regla DIAN
Anticipo Total: Suma de todos los pagos anticipados
El Valor del Anticipo Total es igual a la Suma de todos los anticipos o prepagos globales aplicados al total de la factura.
Rechazo:
Si
(/Invoice/cac:LegalMonetaryTotal/cbc: PrepaidAmount) then round(/Invoice/cac:LegalMonetaryTota l/cbc:PrepaidAmount) = round(sum(/Invoice/cac:PrepaidPayme nt/cbc:PaidAmount)) else true()

### ✔ Mensaje DIAN
> Valor del Anticipo Total es distinto a la Suma de todos los anticipos o prepagos globales aplicados al total de la factura.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU13
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU14
**Tipo de documento:** F.V.E
**Elemento:** PayableAmount

### ✔ Regla DIAN
Valor de la Factura: Valor total de ítems (incluyendo cargos y descuentos a nivel de ítems) + valor tributos + valor cargos – valor descuentos.
El Valor a Pagar de Factura es igual a la Suma de Valor Bruto más tributos - Valor del Descuento Total + Valor del Cargo Total
Rechazo:
Si
let $TaxInclusiveAmount := if (boolean(//cbc:TaxInclusiveAmount)) then //cbc:TaxInclusiveAmount else 0.00, $SumTotalAllowance := if (boolean(//cbc:AllowanceTotalAmount
)) then //cbc:AllowanceTotalAmount else 0.00, $SumTotalCharge := if (boolean(//cbc:ChargeTotalAmount)) then //cbc:ChargeTotalAmount else 0.00, $PrepaidAmount := if (boolean(//cac:PrepaidPayment/cbc:Pa idAmount)) then sum(//cac:PrepaidPayment/cbc:PaidA mount) else 0.00, $PayableAmount :=
$TaxInclusiveAmount -$SumTotalAllowance +
$SumTotalCharge return round(number($PayableAmount)) es distinto de round(//cac:LegalMonetaryTotal/cbc:P ayableAmount)

### ✔ Mensaje DIAN
> Valor a Pagar de Factura es distinto de la Suma de Valor Bruto más tributos - Valor del Descuento Total + Valor del Cargo Total

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAU15
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAV01
**Tipo de documento:** F.V.E
**Elemento:** InvoiceLine

### ✔ Regla DIAN
Grupo de campos para información relacionada con una línea de factura
Cuando se deba facturar un producto y un servicio, se deberán informar en
Items(InvoiceLine) por separado.

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAV08a
**Tipo de documento:** F.V.E
**Elemento:** schemeID

### ✔ Regla DIAN
Debe ser informado cuando el tipo de operación es “11”

### ✔ Mensaje DIAN
> Atributo no puede estar vacío

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAV08b
**Tipo de documento:** F.V.E
**Elemento:** schemeID

### ✔ Regla DIAN
Debe ser informado cuando el tipo de operación es “11”

### ✔ Mensaje DIAN
> Debe corresponde a un valor valido.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAV04a
**Tipo de documento:** F.V.E
**Elemento:** InvoicedQuantity

### ✔ Regla DIAN
Valida que la cantidad del producto o servicio de cada línea exista

### ✔ Mensaje DIAN
> No se encuentra el campo cbc:InvoicedQuantity

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAV04b
**Tipo de documento:** F.V.E
**Elemento:** InvoicedQuantity

### ✔ Regla DIAN
Valida que la cantidad del producto o servicio de cada línea exista

### ✔ Mensaje DIAN
> No se puede expresar valores negativos

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAV05
**Tipo de documento:** F.V.E
**Elemento:** @unitCode

### ✔ Regla DIAN
Válida la Unidad de Medida de la cantidad del artículo solicitado
Ver lista de valores posibles en 0 Notificación si el valor del atributo no se
encuentra en la columna “Unid”

### ✔ Mensaje DIAN
> La unidad de la cantidad utilizada no existe en la lista de unidades

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAV06
**Tipo de documento:** F.V.E
**Elemento:** LineExtensionAmount

### ✔ Regla DIAN
Valida Valor total de la línea.
El Valor Total de la línea es igual al producto de Cantidad x Precio Unidad menos Descuentos más Recargos que apliquen para la línea. Rechazo: Sí /Invoice/cac:InvoiceLine/cbc:LineExtensio nAmount es distinto de /Invoice/Price/cbc:PriceAmount * /Invoice/Price/cbc:Price/BaseQuantity) – (/Invoice/cac:InvoiceLine/cac:AllowanceCh arge/cbc:Amount, correspondientes a aquellos grupos en donde /Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:ChargeIndicator es “false”o               ) + (/Invoice/cac:InvoiceLine/cac:AllowanceCh arge/cbc:Amount, correspondientes a aquellos grupos en donde AllowanceCharge/cbc:ChargeIndicator es “true”)
Nota: Si se informa el grupo InvoiceLine/cac:PricingReference entonces el valor de LineExtensionAmout es cero (0.00), ya que se trata de muestra o regalo comercial

### ✔ Mensaje DIAN
> Valor total de la línea, libre de tributos, diferente del producto de la cantidad por el precio unitario, considerados los cargos y los descuentos aplicados en esta línea

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAV07
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAW03
**Tipo de documento:** F.V.E
**Elemento:** PriceAmount

### ✔ Regla DIAN
Corresponde al valor del precio referencia del ítem que se da como muestra o regalo sin valor comercial. Valida que, si PricingReference fue informado, entonces PriceAmount debe
existir, no puede estar vacío, ni ser “cero”

### ✔ Mensaje DIAN
> Precio referencial no informado.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAW04
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBE01
**Tipo de documento:** F.V.E
**Elemento:** AllowanceCharge

### ✔ Regla DIAN
Grupo de campos para información relacionadas con un cargo o un descuento

### ✔ Mensaje DIAN
> No fue informado el conjunto de elementos: ChargeIndicator, MultiplierFactorNumeric, Amount y BaseAmount

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBE03
**Tipo de documento:** F.V.E
**Elemento:** ChargeIndicator

### ✔ Regla DIAN
Indica que el elemento es un Cargo y no un descuento
Cargo es true, es un Débito aumenta el valor del ítem.
Descuento es false, un Crédito descuenta el valor del ítem
El elemento solamente puede identificar una de las informaciones
Rechazo: Si este elemento contiene una
información diferente de “true” o “false”

### ✔ Mensaje DIAN
> El valor informado no corresponde a ninguno de los valores esperados (“true” o “false”)

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBE05
**Tipo de documento:** F.V.E
**Elemento:** MultiplierFactorNumeric

### ✔ Regla DIAN
Porcentaje aplicado en decimales Sin Validación

### ✔ Mensaje DIAN
> El porcentaje informado es mayor a 100.00

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBE06
**Tipo de documento:** F.V.E
**Elemento:** Amount

### ✔ Regla DIAN
Valor numérico del Cargo el Descuento
Si es descuento, no puede ser superior al valor base
Sin Validación

### ✔ Mensaje DIAN
> El valor no corresponde a la operación entre la base y el porcentaje del cargo o descuento.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBE07
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBE08
**Tipo de documento:** F.V.E
**Elemento:** BaseAmount

### ✔ Regla DIAN
Valor Base para calcular el descuento el cargo
Positivo mayor que cero

### ✔ Mensaje DIAN
> Rechazo si hay un descuento " Valor del descuento es mayor al valor total de la factura " Rechazo si hay un recargo " Base para calcular el recargo es mayor al valor Total Bruto antes de tributos" Valor del recargo o descuento informado no es valido

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBE09
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX01
**Tipo de documento:** F.V.E
**Elemento:** TaxTotal

### ✔ Regla DIAN
Grupo de campos para información relacionadas con un tributo aplicable a esta línea de la factura
Un bloque para cada código de tributo Rechazo: Si existe más de un bloque con el mismo valor en el elemento de:TaxTotal/TaxSubtotal/cac:TaxCategory/cac:TaxScheme/cbc:ID
Este grupo NO debe ser informado para ítems excluidos de acuerdo a lo establecido en el ET. Adicionalmente, NO debe ser informado para facturas del régimen simple grupo I, ni para ítems cuyo concepto en contratos de AIU no haga parte de la base gravable.
A nivel de ítem solo aplica para tributos que deban informase a nivel de ítem, por ejemplo, IVA, INC, IC, Impuesto Nacional a los Combustibles, entre otros

### ✔ Mensaje DIAN
> Existe más de un grupo con información de totales para un mismo tributo en una línea de la factura

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX03
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX19
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX06
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX07
**Tipo de documento:** F.V.E
**Elemento:** TaxAmount

### ✔ Regla DIAN
Valor del tributo: producto del porcentaje aplicado sobre la base imponible Rechazo: Para tributos cuya tarifa se enuncia en porcentajes
si ../cac:TaxTotal/cbc:TaxAmount <>
../cac:TaxTotal/cbc:TaxableAmount *
../cac:TaxTotal/cbc:Percent Rechazo:Para tributos cuya tarifa se enuncia en valores nominales (ejemplo bolsas plásticas)
si ../cac:TaxTotal/cbc:TaxAmount <>
../cac:TaxTotal/cbc:PerUnitAmount * InvoiceLine/cbc:InvoicedQuantity Rechazo: para el impuesto Nominal IBUA el cálculo, se realiza entre los valores de los campos (PerUnitAmount*BaseUnitMeasure) y su resultado debe ser dividido por cien
(100)
Rechazo: para el impuesto Nominal INPP el cálculo, se realiza entre los valores de los campos (PerUnitAmount*BaseUnitMeasure) Rechazo: para el impuesto ICUI el cálculo, se realiza entre los valores de los campos (TaxableAmount*Percent dividido por
cien (100))

### ✔ Mensaje DIAN
> (R) El valor del tributo correspondiente al precio unitario del impuesto multiplicado por la cantidad de ítem vendidos (R) El valor del tributo correspondiente a una de las tarifas correspondientes es diferente del producto del porcentaje aplicado sobre la base imponible

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX08
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX09
**Tipo de documento:** F.V.E
**Elemento:** BaseUnitMeasure

### ✔ Regla DIAN
Unidad de medida base para el tributo
Usado en el caso de que el tributo es un valor fijo por unidad tributada: informar el valor del tributo por unidad tributada. Por ejemplo, el impuesto de consumo a las bolsas o los impuestos a los combustibles
let $i := //cac:InvoiceLine/cac:TaxTotal/cac:TaxSu btotal/cac:TaxCategory/cac:TaxScheme/ cbc:ID, $j := //cac:InvoiceLine/cac:TaxTotal/cac:TaxSu btotal return every $k in $i satisfies if ($k
= '21' or $k = '22' or $k = '23' or $k ='24') then $j/cbc:BaseUnitMeasure !='' and $j/cbc:BaseUnitMeasure/@unitCode !='' else true()

### ✔ Mensaje DIAN
> Si el elemento NO es informado o no existe

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX12
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX13
**Tipo de documento:** F.V.E
**Elemento:** TaxCategory

### ✔ Regla DIAN
Grupo de información sobre el tributo

### ✔ Mensaje DIAN
> Grupo no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX15
**Tipo de documento:** F.V.E
**Elemento:** TaxScheme

### ✔ Regla DIAN
Grupo de información específica sobre el tributo

### ✔ Mensaje DIAN
> Grupo no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAX16
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Ver lista de valores posibles en ¡Error! No se encuentra el origen de la referencia.
Rechazo: Si el contenido de este elemento no corresponde a un contenido de la
columna “Identificador”

### ✔ Mensaje DIAN
> No corresponde a un valor valido de la columna “IDENTIFICADOR” de la lista en ¡Error! No se encuentra el origen de la referencia.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY02
**Tipo de documento:** F.V.E
**Elemento:** TaxAmount

### ✔ Regla DIAN
Suma de todos los elementos
../cac:WithholdingTaxTotal/TaxSubtotal/c bc:TaxAmount
Rechazo: si ../cac: WithholdingTaxTotal
/cbc:TaxAmount <> sumatoria de todas las ocurrencias de ../cac: WithholdingTaxTotal/TaxSubtotal/cbc:Tax
Amount

### ✔ Mensaje DIAN
> (R) Valor total de un tributo no corresponde a la suma de todas las informaciones correspondientes a cada una de las tarifas informadas en este documento para este tributo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY03
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY04
**Tipo de documento:** F.V.E
**Elemento:** TaxSubtotal

### ✔ Regla DIAN
Grupo de información que definen los valores del tributo

### ✔ Mensaje DIAN
> Grupo no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY05
**Tipo de documento:** F.V.E
**Elemento:** TaxableAmount

### ✔ Regla DIAN
El valor de la Base Imponible de la línea es igual al producto de Cantidad x Precio Unidad menos Descuentos más Recargos que apliquen para la línea.
Para el caso una operación gratuita (afecta a tributo), se debe informar en la base imponible Cantidad x Precio Referencial Unidad menos Descuentos más Recargos que apliquen para la línea.
Nota: Cuando la retención es ReteIVA (05)
la base tributable es el monto tributo IVA

### ✔ Mensaje DIAN
> No fue informado el elemento

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY06
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY07
**Tipo de documento:** F.V.E
**Elemento:** TaxAmount

### ✔ Regla DIAN
Valor del tributo: producto del porcentaje aplicado sobre la base imponible

### ✔ Mensaje DIAN
> El valor del tributo correspondiente a una de las tarifas es diferente del producto del porcentaje aplicado sobre la base imponible

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY08
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Sí no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY09
**Tipo de documento:** F.V.E
**Elemento:** TaxCategory

### ✔ Regla DIAN
Grupo de información sobre el tributo

### ✔ Mensaje DIAN
> Grupo no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY11
**Tipo de documento:** F.V.E
**Elemento:** TaxScheme

### ✔ Regla DIAN
Grupo de información específica sobre el tributo

### ✔ Mensaje DIAN
> Grupo no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAY12
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Identificador del tributo
En el caso de que el tributo es un porcentaje del valor tributable: informar la tarifa (porcentaje) a ser aplicada a la base imponible
Ver lista de valores posibles en ¡Error! No se encuentra el origen de la referencia.

### ✔ Mensaje DIAN
> Ver lista de valores posibles en ¡Error! No se encuentra el origen de la referencia. Rechazo: Si el contenido de este elemento no corresponde a un contenido de la columna “Identificador” (aceptase elemento sin contenido)

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAZ01
**Tipo de documento:** F.V.E
**Elemento:** Item

### ✔ Regla DIAN
Grupo de información que describen las características del artículo o servicio

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAZ02
**Tipo de documento:** F.V.E
**Elemento:** Description

### ✔ Regla DIAN
Descripción del artículo o servicio a que se refiere esta línea de la factura debe ser
informada

### ✔ Mensaje DIAN
> Descripción no informada

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAZ09
**Tipo de documento:** F.V.E
**Elemento:** StandardItemIdentification

### ✔ Regla DIAN
Grupo de datos de identificación del artículo o servicio de acuerdo con un esta estándar debe ser informado. Son admitidas hasta tres codificaciones
estándar para un mismo artículo

### ✔ Mensaje DIAN
> StandardItemIdentification no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAZ10
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Código de acuerdo con él estándar descrito en el atributo ID/@schemeAgencyID

### ✔ Mensaje DIAN
> Código del ítem de no estar de acuerdo al estándar informado en @ schemeAgencyID

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAZ11
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Código de acuerdo con el estándar descrito en el atributo ID/@schemeID

### ✔ Mensaje DIAN
> El valor informado es diferente al de la tabla 13.3.5 de la columna @schemeID

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAZ12
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Ver estándares en 0
Notificación si el código no existe en un estándar cerrado
Ejemplo: UNSPSC
Notificación: si el código no sigue la regla de formación de un código abierto, pero con valores verificables
Ejemplo: GTIN
Ejemplo: Partidas arancelarias

### ✔ Mensaje DIAN
> El Valor informado es diferente al de la tabla 13.3.5 de la columna @schemeName

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAZ13
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Sin Validación

### ✔ Mensaje DIAN
> Valor informado en el atributo no es valido

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FAZ14
**Tipo de documento:** F.V.E
**Elemento:** @schemeAgencyID

### ✔ Regla DIAN
Rechazo: si ID@schemeID = 010 y ID@schemeAgencyID <>9

### ✔ Mensaje DIAN
> Valor informado en el atributo no es valido

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBA01
**Tipo de documento:** F.V.E
**Elemento:** InformationContentProviderParty

### ✔ Regla DIAN
Grupo de información que describen el mandatario de la operación de venta. Aplica solo para mandatos, y se debe informar a nivel de ítem
Obligatorio para facturas de mandato. Se informa el mandatario a nivel de ítem. Un
mandante por ítem

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBA02
**Tipo de documento:** F.V.E
**Elemento:** PowerOfAttorney

### ✔ Regla DIAN
Obligatorio si InformationContentProviderParty es informado

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBA03
**Tipo de documento:** F.V.E
**Elemento:** AgentParty

### ✔ Regla DIAN
Obligatorio si InformationContentProviderParty es informado

### ✔ Mensaje DIAN
> No fue informado el elemento

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBA05
**Tipo de documento:** F.V.E
**Elemento:** ID

### ✔ Regla DIAN
Identificación del mandante.

### ✔ Mensaje DIAN
> El tipo de operación es mandatos y no se informa la identificación del Mandante

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBA07
**Tipo de documento:** F.V.E
**Elemento:** @schemeID

### ✔ Regla DIAN
Si Mandante está identificado por NIT (@schemeName=31), el DV del NIT debe
ser informado en @schemeID

### ✔ Mensaje DIAN
> DV del NIT del emisor no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBA08
**Tipo de documento:** F.V.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Identificador del tipo de documento de identidad

### ✔ Mensaje DIAN
> El contenido de este atributo no corresponde a uno de los valores posibles de la lista0

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBB01
**Tipo de documento:** F.V.E
**Elemento:** Price

### ✔ Regla DIAN
Grupo de información que describen los precios del artículo o servicio

### ✔ Mensaje DIAN
> No existe elemento

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBB02
**Tipo de documento:** F.V.E
**Elemento:** PriceAmount

### ✔ Regla DIAN
Valor del artículo o servicio

### ✔ Mensaje DIAN
> No está informado valor

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBB03
**Tipo de documento:** F.V.E
**Elemento:** @currencyID

### ✔ Regla DIAN
Rechazo: Si no es igual a cbc:DocumentCurrencyCode

### ✔ Mensaje DIAN
> Remítase a regla FAD15b ya que al cumplirse dicha regla verifica que este elemento corresponder al mismo valor informado en DocumentCurrencyCode

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBB04
**Tipo de documento:** F.V.E
**Elemento:** BaseQuantity

### ✔ Regla DIAN
La cantidad real sobre la cual el precio aplica

### ✔ Mensaje DIAN
> No está informada la cantidad

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: FBB05
**Tipo de documento:** F.V.E
**Elemento:** @unitCode

### ✔ Regla DIAN
Valida la Unidad de Medida de la cantidad del artículo solicitado. Ver lista de valores posibles en 0 Nota: si el valor del atributo no se encuentra en la columna “Unid”.

### ✔ Mensaje DIAN
> La unidad de la cantidad utilizada no existe en la lista de unidades

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CAD02a
**Tipo de documento:** N.C.E
**Elemento:** CustomizationID

### ✔ Regla DIAN
Indicador del tipo de operación, cuando se utiliza el código ”2” de la tabla 13.2.4 Concepto de Anulacion para Notas Credito.

### ✔ Mensaje DIAN
> CustomizationID debe sr igual a
“20”

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CBF01
**Tipo de documento:** N.C.E
**Elemento:** DiscrepancyResponse

### ✔ Regla DIAN
Se debe diligenciar únicamente cuando la NC se origina a partir de la corrección o ajuste que se da mediante una FE

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CBF03
**Tipo de documento:** N.C.E
**Elemento:** ResponseCode

### ✔ Regla DIAN
Código de tipo de Nota Credito Debe validar contra lista

### ✔ Mensaje DIAN
> El Código informado no se encuentra en la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CBF03a
**Tipo de documento:** N.C.E
**Elemento:** ResponseCode

### ✔ Regla DIAN
Rechazo: Si el CustomizationID es igual a 22 y el cac:DiscrepancyResponse/cbc:Respo nseCode es igual a 2

### ✔ Mensaje DIAN
> Con este tipo de Notas Crédito no puede anular Facturas

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CBF04
**Tipo de documento:** N.C.E
**Elemento:** Description

### ✔ Regla DIAN
Descripción del código causal de la nota credito

### ✔ Mensaje DIAN
> La Descripción informada no se encuentra en la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CBG01
**Tipo de documento:** N.C.E
**Elemento:** BillingReference

### ✔ Regla DIAN
Se debe diligenciar únicamente cuando la NC se origina a partir de la corrección o ajuste que se da mediante una FE

### ✔ Mensaje DIAN
> Nota tipo uno a uno y no se informa BillingReference

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CBG02
**Tipo de documento:** N.C.E
**Elemento:** InvoiceDocumentReference

### ✔ Regla DIAN
Grupo de información para nota débito relacionada

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CBG03
**Tipo de documento:** N.C.E
**Elemento:** ID

### ✔ Regla DIAN
Prefijo + Número de la nota débito relacionada

### ✔ Mensaje DIAN
> ID de FE de referencia no relacionada

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CBG04
**Tipo de documento:** N.C.E
**Elemento:** UUID

### ✔ Regla DIAN
Se debe diligenciar únicamente cuando la NC se origina a partir de la corrección o ajuste a una FE

### ✔ Mensaje DIAN
> CUFE de FE de referenciada no existe

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CBG05
**Tipo de documento:** N.C.E
**Elemento:** @schemeName

### ✔ Regla DIAN
Algoritmo del CUFE

### ✔ Mensaje DIAN
> Algoritmo no corresponde

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CAJ43
**Tipo de documento:** N.C.E
**Elemento:** RegistrationName

### ✔ Regla DIAN
Nombre o Razón Social del emisor debe ser informado

### ✔ Mensaje DIAN
> Nombre No informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CAJ44
**Tipo de documento:** N.C.E
**Elemento:** CompanyID

### ✔ Regla DIAN
NIT del emisor

### ✔ Mensaje DIAN
> NIT no autorizado a facturar electrónicamente

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CAN03a
**Tipo de documento:** N.C.E
**Elemento:** PaymentMeansCode

### ✔ Regla DIAN
El medio de pago debe estar relacionado con la tabla 0
Obligatorio si: .../cac:PaymentMeans/cb c:ID corresponde a Contado.

### ✔ Mensaje DIAN
> Medio de pago inválido.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CAN03b
**Tipo de documento:** N.C.E
**Elemento:** PaymentMeansCode

### ✔ Regla DIAN
El medio de pago debe ser informado para facturas de contado. Se sugiere utilizar “Acuerdo Mutuo” para operaciones de contado

### ✔ Mensaje DIAN
> Medio de pago no informado.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CAW01
**Tipo de documento:** N.C.E
**Elemento:** PricingReference

### ✔ Regla DIAN
Es obligatorio informar si se trata de muestras comerciales. indica el precio de referencia para línea que no contienen valor comercial. Valida LineExtensionAmount en cero y grupo cac:PricingReference no informado

### ✔ Mensaje DIAN
> Línea de factura informado con LineExtensionAmount en cero y grupo cac:PricingReference no informado

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: CAW02
**Tipo de documento:** N.C.E
**Elemento:** AlternativeConditionPrice

### ✔ Regla DIAN
Grupo para informar el precio

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: DAB24D
**Tipo de documento:** N.D.E
**Elemento:** softwareID

### ✔ Regla DIAN
Identificador del software asignado cuando el software se activa en el Sistema de Facturación Electrónica debe estar activo.

### ✔ Mensaje DIAN
> Identificador del software informado se encuentra inactivo.

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: DBF01
**Tipo de documento:** N.D.E
**Elemento:** DiscrepancyResponse

### ✔ Regla DIAN
Se debe diligenciar únicamente cuando la Nota Débito se origina a partir de la corrección o ajuste que se da mediante una F.E.

### ✔ Mensaje DIAN
> No fue informado el grupo

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: DBF02
**Tipo de documento:** N.D.E
**Elemento:** ReferenceID

### ✔ Regla DIAN
Identifica la sección de la factura original a la cual se aplica la corrección

### ✔ Mensaje DIAN
> No se informó el numero de la factura referenciada

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: DBF03
**Tipo de documento:** N.D.E
**Elemento:** ResponseCode

### ✔ Regla DIAN
Código de tipo de Nota Debito Debe validar contra lista

### ✔ Mensaje DIAN
> El Código informado no se encuentra en la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---

## 🔹 Código: DBF04
**Tipo de documento:** N.D.E
**Elemento:** Description

### ✔ Regla DIAN
Descripción del código causal de la nota debito

### ✔ Mensaje DIAN
> La Descripción informada no se encuentra en la lista

### ✔ Interpretación funcional
El documento incumple una validación estructural obligatoria exigida por la DIAN.

### ✔ Recomendación para el usuario
Para que nuestro equipo especializado pueda revisar el caso directamente, te recomiendo **crear un tiquete de soporte directamente desde el ícono del teléfono** que encuentras en la parte inferior del chat.   

Allí podrás incluir:  
- El **código de rechazo o mensaje completo que muestra la DIAN**.   
- El **tipo de documento** que estás intentando enviar (factura, nómina, evento, documento soporte, etc.).   
---
