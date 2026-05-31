# Video QA Camilo — errores en `itdform=create`

Video fuente: **qa test camilo - 2026 05 28 10 46 15 errores en itdform=create** (`dmlU60yHNEc`).

La transcripción automática de YouTube confirma dos novedades funcionales reportadas por Camilo. Ambas ocurren únicamente en flujos de **creación** (`itdform=create`) y no se reproducen igual cuando el registro principal ya existe.

## TK-1430975 · Curso nuevo / pestaña Contenido

- **0:00–0:14:** al crear un curso desde cero y agregar un recurso en la pestaña **Contenido**, el botón del **ojito** debería abrir el recurso existente, pero el formulario aparece vacío.
- **0:14–0:47:** el mismo recurso en un curso ya creado sí abre con toda la información, por lo que la diferencia está en el branch de creación del curso, no en el recurso en sí.
- **1:01–1:34:** al hacer doble clic sobre el recurso agregado en el curso en creación, se abre la vista de relación, pero sin los atributos del driver. En un curso existente sí se ven los atributos para configurar básico / medio / avanzado, padre, etc.
- **1:42–2:21:** se identifica como una condición propia de creación. La vista esperada para consultar la relación/atributos parece estar bifurcada entre `edit` y `create`; en `create` no se hidrata la información del driver.

Hipótesis de solución:

- Revisar el flujo de apertura del recurso desde `TreeContenidos`/contenido del curso cuando el curso aún no está persistido.
- Validar si el objeto temporal del recurso conserva el identificador necesario para abrir el detalle real con el ojito.
- Revisar el branch `create` de la vista de relación recurso-plan/curso para que cargue los atributos del driver igual que en `edit`.

Criterios de QA:

- En curso nuevo, agregar recurso en **Contenido** y abrirlo con el ojito: debe mostrar datos del recurso, no formulario vacío.
- En curso nuevo, doble clic sobre el recurso: debe mostrar los atributos del driver.
- Repetir en curso existente para garantizar que el comportamiento previo no se rompe.

## TK-1430974 · Plan de estudio / Cursos integrados

- **2:29–2:37:** Camilo muestra el segundo caso en **Planes de estudio**.
- **2:43–2:56:** desde la **vista grande** del formulario, al entrar a **Cursos integrados**, seleccionar un curso y pulsar **Aceptar**, el registro no se agrega a la grilla.
- **2:56–3:07:** desde la **vista de formulario rápida**, el mismo alta sí agrega el curso correctamente.
- **3:07–3:22:** se asume una condición específica que quedó colándose en la vista grande.

Hipótesis de solución:

- Comparar el flujo de inserción de cursos integrados entre vista grande y formulario rápido.
- Revisar si la vista grande está pasando un `Obj`, `frmItd`, contexto de catálogo o handler distinto al aceptar.
- Validar si la grilla/list-slave recibe el registro pero no dispara refresco, o si la inserción se cancela antes de mutar el modelo.

Criterios de QA:

- Crear/editar plan desde vista grande, pestaña **Cursos integrados**, agregar curso y aceptar: debe aparecer en la grilla.
- Repetir el alta desde formulario rápido: debe seguir funcionando.
- Verificar que no se dupliquen filas ni se pierdan datos al alternar entre ambas vistas.

## Lectura general para resolución

- Los dos problemas están acotados a flujos de creación o vista grande; conviene buscar condiciones por `itdform`, `create`, `edit`, `pkReadonly`, inicialización de `Obj` y rehidratación de list-slaves.
- El video no evidencia error de backend ni respuesta HTTP fallida; el síntoma es de estado/UI: vistas vacías, atributos no hidratados y alta que no impacta la grilla.
- Para cerrar los TK, la evidencia debe capturarse con navegador en los dos caminos: caso que fallaba y caso control que ya funcionaba.
